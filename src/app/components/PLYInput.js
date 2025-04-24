'use client';

import usePlyStore from '@/app/store/plyStore';

export default function PLYInput() {
    const { setFileData, setLoading, setError } = usePlyStore();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            
            // 读取文件内容
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileData(e.target.result);
            };
            reader.onerror = (e) => {
                setError('文件读取失败');
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4">
            <legend className="fieldset-legend text-primary-content m-2">
                选择 PLY 文件
            </legend>
            <input 
                type="file" 
                className="file-input file-input-secondary" 
                accept=".ply"
                onChange={handleFileChange}
            />
        </div>
    );
}
