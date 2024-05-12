export default function Home() {
  return (
    <div className='container flex flex-col items-center border-2 border-neutral-700 p-10 rounded-lg text-neutral-400 gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-semibold text-white'>Objective</h1>
        <p className='text-center'>
          Know your code skills for an every-day code problem based on our team
          design system&apos;s needs.
        </p>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <hr className='w-4/12 h-[2px] border-0 bg-neutral-700' />

        <h2 className='text-2xl font-semibold text-white'>Exercise</h2>
        <p className='text-center'>
          You have to create the following component:{' '}
          <code className='text-green-600'>&lt;Range /&gt;</code>
        </p>
        <p>You have to use React to create the solution.</p>
        <p className='text-center'>
          You do NOT have to use any CLI to create structure and architecture of
          your application.
        </p>
        <p className='text-center'>This component has two use modes:</p>
        <div className='text-center'>
          <div>Normal range from min to max number.</div>
          <div>Fixed number of options range.</div>
        </div>
      </div>

      <hr className='w-4/12 h-[2px] border-0 bg-neutral-700' />

      <h2 className='text-2xl font-semibold text-white'>Solution</h2>

      <div className='flex items-center gap-4 flex-col md:flex-row'>
        <a
          className='text-center min-w-48 px-4 py-2 rounded-md border-2 transition font-semibold border-neutral-700 hover:border-white text-neutral-400 hover:text-white'
          href='/exercise1'
        >
          Normal Range
        </a>
        <a
          className='text-center min-w-48 px-4 py-2 rounded-md border-2 transition font-semibold border-neutral-700 hover:border-white text-neutral-400 hover:text-white'
          href='/exercise2'
        >
          Fixed Values Range
        </a>
      </div>
    </div>
  )
}
