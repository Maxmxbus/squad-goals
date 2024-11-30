import '../css/don-tasks.css'

export default function Home() {
    return (
        <div className='main'>
            <div className='info'>
                <h1 className='text-2xl'>Username: 0x92d...aff2</h1>
                <h2 className='text-xl'>Status: Don</h2>
            </div>
            <div className='container'>
                <div className='complete-task'>
                    <h1 className='headingBase'>Complete Tasks</h1>
                    <label className="cursor-pointer label task">
                        <div className="badge badge-secondary badge-md" />
                        <span className="label-text">Remember me</span>
                    </label>

                </div>
                <div className='incomplete-task'>
                    <h1 className='headingBase'>Incomplete Tasks</h1>
                    <label className="cursor-pointer label task">
                        <input type="checkbox" className="checkbox checkbox-secondary" />
                        <span className="label-text">Remember me</span>
                    </label>
                    <label className="cursor-pointer label task">
                        <input type="checkbox" className="checkbox checkbox-secondary" />
                        <span className="label-text">Remember me</span>
                    </label>
                </div>

            </div>
            <div className='addClass'>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary w-full max-w-xs" />

                <button className={"task-btn btn btn-outline btn-secondary"}>
                    Add Task
                </button>
            </div>
        </div>
    );
}