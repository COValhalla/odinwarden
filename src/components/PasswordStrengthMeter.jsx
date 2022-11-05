import React from 'react'
import zxcvbn from 'zxcvbn'

function PasswordStrengthMeter(props) {
  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Weak'
      case 1:
        return 'Weak'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      default:
        return 'Weak'
    }
  }

  const calculateWidth = (result) => {
    const transitionStyle = { transition: 'width 0.5s ease-in-out' }
    switch (result.score) {
      case 0:
        return {
          width: '16%',
          backgroundColor: '#dd4b39',
          transition: transitionStyle,
        }
      case 1:
        return {
          width: '16%',
          backgroundColor: '#dd4b39',
          transition: transitionStyle,
        }
      case 2:
        return {
          width: '45%',
          backgroundColor: '#dd4b39',
          transition: transitionStyle,
        }
      case 3:
        return {
          width: '70%',
          backgroundColor: '#175ddc ',
          transition: transitionStyle,
        }
      case 4:
        return {
          width: '100%',
          backgroundColor: '#00a65a',
          transition: transitionStyle,
        }
      default:
        return {
          width: '16%',
          backgroundColor: '#ff0000',
          transition: transitionStyle,
        }
    }
  }

  const testedResult = zxcvbn(props.password)
  return (
    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="transform  rounded-full bg-red-400 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition duration-500 ease-in-out"
        style={calculateWidth(testedResult)}
      >
        <span className="font-bold">{createPasswordLabel(testedResult)}</span>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
