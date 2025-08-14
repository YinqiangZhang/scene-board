import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { image, pitch, yaw } = body;

    // 验证输入参数
    if (!image || typeof pitch !== 'number' || typeof yaw !== 'number') {
      return NextResponse.json(
        { error: '缺少必要参数或参数格式错误' },
        { status: 400 }
      );
    }

    // 构建深度数据文件路径
    const depthDir = path.join(process.cwd(), 'public', 'pano_depth');
    const jsonPath = path.join(depthDir, `${image}.json`);
    const binPath = path.join(depthDir, `${image}.bin`);

    // 检查文件是否存在
    if (!fs.existsSync(jsonPath) || !fs.existsSync(binPath)) {
      return NextResponse.json(
        { error: '深度数据文件不存在' },
        { status: 404 }
      );
    }

    // 读取JSON配置文件
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const { width, height, invalid_value } = jsonData;

    // 读取二进制深度数据
    const buffer = fs.readFileSync(binPath);
    
    // 将pitch和yaw转换为像素坐标
    // pitch: -90到90度，对应height
    // yaw: 0到360度，对应width
    const x = Math.round(((yaw + 180) % 360) / 360 * width);
    const y = Math.round(((90 - pitch) / 180) * height);
    
    // 确保坐标在有效范围内
    const clampedX = Math.max(0, Math.min(width - 1, x));
    const clampedY = Math.max(0, Math.min(height - 1, y));
    console.log(clampedX, clampedY);
    
    // 计算在二进制数据中的位置
    // 假设深度数据是32位浮点数
    const bytesPerPixel = 4;
    const offset = (clampedY * width + clampedX) * bytesPerPixel;
    
    if (offset + bytesPerPixel > buffer.length) {
      return NextResponse.json(
        // 不报错，返回空
        { error: '坐标超出深度数据范围' },
        { status: 400 }
      );
    }
    
    // 读取深度值（32位浮点数）
    const depth = buffer.readFloatLE(offset);
    
    // 检查是否为无效值
    if (depth === invalid_value || depth === 0) {
      return NextResponse.json(
        { error: '该位置没有有效的深度数据' },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      depth: depth,
      coordinates: {
        pitch: pitch,
        yaw: yaw,
        pixelX: clampedX,
        pixelY: clampedY
      },
      imageInfo: {
        width: width,
        height: height
      }
    });

  } catch (error) {
    console.error('获取深度数据时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
