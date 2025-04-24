import Board from "@/app/components/Board";
import Box3D from "@/app/components/Box3D";
import StoreyInfo from "@/app/components/StoreyInfo";
import PLYInput from "@/app/components/PLYInput";
import LoadScene from "@/app/components/LoadScene";


export default function MeshScene() {
    return (
        <div className="min-h-screen p-6">
            <div className="card max-w-auto shadow-lg p-6 rounded-box bg-base-200">
            <h1 className="text-2xl font-bold mb-4">
                BIM Visualization Board
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-primary rounded-box place-items-center shadow-lg">
                    <div className="m-2 text-xl text-primary-content font-bold">
                        Game Box Panel
                    </div> 
                    <div className="mt-2 mb-4">
                        <Board />
                    </div>
                </div>
                <div className="card bg-secondary rounded-box place-items-center shadow-lg">
                    <div className="p-2 text-xl text-primary-content font-bold">
                        3D Panel
                    </div>
                    <div className="w-full">
                        <Box3D color="red" />
                    </div>
                    <div className="w-full">
                        <StoreyInfo />
                    </div>
                </div>
            </div>
            <div className="divider divider-neutral">3D-Environment</div>
            <div className="card bg-accent rounded-box place-items-center shadow-lg">
                <div className="p-2 text-xl text-primary-content font-bold">
                    Scene Panel
                </div>
                <div className="w-full">
                    <PLYInput />
                    <LoadScene />
                </div>
            </div>
        </div>
        
      </div>
    );
}
        