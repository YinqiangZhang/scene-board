'use client';

import usePlyStore from '@/app/store/plyStore';

export default function PLYInput() {
    const { setMeshData, setPointCloudData, setLoading, setError } = usePlyStore();

    const handleMeshFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setMeshData(e.target.result);
            };
            reader.onerror = (e) => {
                setError('Mesh 文件读取失败');
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePointCloudFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setPointCloudData(e.target.result);
            };
            reader.onerror = (e) => {
                setError('点云文件读取失败');
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4 space-y-4">
            <div>
                <legend className="fieldset-legend text-primary-content m-2">
                    选择 Mesh PLY 文件
                </legend>
                <input 
                    type="file" 
                    className="file-input file-input-secondary w-full" 
                    accept=".ply"
                    onChange={handleMeshFileChange}
                />
            </div>
            
            <div>
                <legend className="fieldset-legend text-primary-content m-2">
                    选择点云 PLY 文件
                </legend>
                <input 
                    type="file" 
                    className="file-input file-input-secondary w-full" 
                    accept=".ply"
                    onChange={handlePointCloudFileChange}
                />
            </div>
        </div>
    );
}
