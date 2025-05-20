import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ExerciseCard(props) {
    const { exercise, i } = props
    const [setsCompleted, setSetsCompleted] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const maxSets = 5

    useEffect(() => {
        setIsComplete(setsCompleted === maxSets)
    }, [setsCompleted])

    function handleSetIncrement() {
        if (setsCompleted < maxSets) {
            setSetsCompleted(prev => prev + 1)
        }
    }

    function handleReset() {
        setSetsCompleted(0)
        setIsComplete(false)
    }

    return (
        <div className='flex flex-col rounded-md p-4 bg-slate-950 sm:flex-wrap relative overflow-hidden'>
            {/* Progress bar background */}
            <motion.div 
                className='absolute inset-0 bg-green-900/20 z-0'
                initial={{ width: 0 }}
                animate={{ width: `${(setsCompleted / maxSets) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
            
            {/* Content container */}
            <div className='relative z-10'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
                    <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400'>0{i+1}</h4>
                    <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>
                        {exercise.name.replaceAll("_"," ")}
                    </h2>
                    <p className='text-sm text-slate-400 capitalize'>{exercise.type}</p>
                </div>
                
                <div className='flex flex-col'>
                    <h3 className='text-slate-400 text-sm'>Muscle Groups</h3>
                    <p className='capitalize'>{exercise.muscles.join('&')}</p>
                </div>

                <div className='flex flex-col bg-slate-950 rounded gap-2'>
                    {exercise.description.split('___').map((val,i) => (
                        <div key={i} className='text-sm'>{val}</div>
                    ))}
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2'>
                    {['reps','rest','tempo'].map(info => (
                        <div key={info} className='flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full'>
                            <h3 className='capitalize text-slate-400 text-sm'>
                                {info === 'reps' ? `${exercise.unit}` : info}
                            </h3>
                            <p className='font-medium'>{exercise[info]}</p>
                        </div>
                    ))}
                    
                    <motion.button 
                        onClick={handleSetIncrement}
                        disabled={isComplete}
                        className={`flex flex-col p-2 m-2 rounded border-[1.5px] duration-200 border-solid w-full relative overflow-hidden ${
                            isComplete 
                                ? 'border-green-600 cursor-not-allowed' 
                                : 'border-blue-900 hover:border-blue-600'
                        }`}
                        whileTap={!isComplete ? { scale: 0.95 } : {}}
                    >
                        <h3 className='capitalize text-slate-400 text-sm'>Sets Completed</h3>
                        <p className='font-medium'>{setsCompleted} / {maxSets}</p>
                        
                        {/* Progress indicator inside button */}
                        <motion.div 
                            className='absolute bottom-0 left-0 h-1 bg-green-600'
                            initial={{ width: 0 }}
                            animate={{ width: `${(setsCompleted / maxSets) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.button>
                </div>

                {/* Reset Button */}
                <motion.button
                    onClick={handleReset}
                    className={`mt-2 w-full py-2 rounded border-[1.5px] border-solid ${
                        setsCompleted > 0 
                            ? 'border-red-600 text-red-400 hover:bg-red-900/30' 
                            : 'border-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                    whileHover={setsCompleted > 0 ? { scale: 1.02 } : {}}
                    whileTap={setsCompleted > 0 ? { scale: 0.98 } : {}}
                    disabled={setsCompleted === 0}
                >
                    Reset Progress
                </motion.button>
            </div>
        </div>
    )
}