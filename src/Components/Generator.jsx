import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

const scaleUp = {
  hover: { scale: 1.03 },
  tap: { scale: 0.98 }
}

function Header(props) {
  const { index, title, description } = props
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className='flex flex-col gap-4'
    >
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </motion.div>
  )
}

export default function Generator(props) {
  const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout, resetWorkout } = props
  const [showModal, setShowModal] = useState(false)
  const resultsRef = useRef(null)
  const [previousWorkout, setPreviousWorkout] = useState(null)

  function toggleModal() {
    setShowModal(!showModal)
  }

  const handleFormulate = () => {
    // Validate selections
    if (!poison) {
      toast.error('Please select a workout type', { position: 'top-center' })
      return
    }
    
    if (muscles.length === 0) {
      toast.error('Please select at least one muscle group', { position: 'top-center' })
      return
    }
    
    if (!goal) {
      toast.error('Please select a training goal', { position: 'top-center' })
      return
    }

    // Reset previous workout before generating new one
    if (previousWorkout) {
      resetWorkout()
      toast.info('Generating new workout...', { position: 'top-center', autoClose: 1000 })
    }

    // Store current selections as previous workout
    setPreviousWorkout({
      poison,
      muscles: [...muscles],
      goal
    })

    // Generate new workout
    updateWorkout()
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup))
      return
    }

    if (muscles.length > 2) {
      toast.warn('Maximum 3 muscle groups allowed', { position: 'top-center' })
      return
    }

    if (poison !== 'individual') {
      setMuscles([muscleGroup])
      setShowModal(false)
      return
    }

    setMuscles([...muscles, muscleGroup])
    if (muscles.length === 2) {
      setShowModal(false)
    }
  }

  return (
    <SectionWrapper id={"generate"} header={"Generate Your Plan"} title={['It\'s', 'Huge', 'o\'clock']}>
      <Header index={'01'} title={'Pick your poison'} description={'Select the workout you wish to endure'} />

      <motion.div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={scaleUp}
              onClick={() => {
                setMuscles([])
                setPoison(type)
              }}
              className={`py-3 px-4 rounded-lg duration-200 border ${
                type === poison 
                  ? 'bg-blue-600 text-black border-blue-700' 
                  : 'bg-slate-900 border-blue-400 hover:border-blue-600'
              }`}
              key={typeIndex}
            >
              <p className='capitalize'>{type.replaceAll('_', " ")}</p>
            </motion.button>
          )
        })}
      </motion.div>

      <Header index={'02'} title={'Lock on targets'} description={'Select the muscles judged for annihilation.'} />

      <motion.div className='bg-slate-950 p-3 border border-solid flex flex-col border-blue-400 rounded-lg'>
        <motion.button 
          whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
          onClick={toggleModal} 
          className='relative p-3 flex items-center justify-center'
        >
          <p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(', ')}</p>
          
          {showModal ? 
            <i className="fa-solid fa-caret-up absolute right-3 top-1/2 -translate-y-1/2"></i> : 
            <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
          }
        </motion.button>
        
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
              className='flex flex-col pb-3 px-3'
            >
              {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                const isSelected = muscles.includes(muscleGroup);
                return (
                  <motion.button
                    key={muscleGroupIndex}
                    initial={false}
                    animate={{
                      backgroundColor: isSelected ? 'rgba(37, 99, 235, 1)' : 'rgba(30, 41, 59, 1)',
                      color: isSelected ? 'white' : 'rgb(226, 232, 240)',
                      borderColor: isSelected ? 'rgba(96, 165, 250, 1)' : 'transparent'
                    }}
                    whileHover={{
                      backgroundColor: isSelected ? 'rgba(29, 78, 216, 1)' : 'rgba(59, 130, 246, 0.2)'
                    }}
                    onClick={() => updateMuscles(muscleGroup)}
                    className={`p-2 rounded mt-1 border`}
                  >
                    <p className='uppercase'>{muscleGroup.replaceAll('_', " ")}</p>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Header index={'03'} title={'Become Juggernaut'} description={'Select your ultimate objective,'} />

      <motion.div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={scaleUp}
              onClick={() => {
                setGoal(scheme)
              }}
              className={`border px-4 py-3 rounded-lg duration-200 ${
                scheme === goal 
                  ? 'bg-blue-600 text-black border-blue-700' 
                  : 'bg-slate-900 border-blue-400 hover:border-blue-600'
              }`}
              key={schemeIndex}
            >
              <p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="flex justify-center mt-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            func={handleFormulate} 
            text={'Formulate'} 
          />
        </motion.div>
      </div>

      <div ref={resultsRef} className="h-0 w-0" />
    </SectionWrapper>
  )
}