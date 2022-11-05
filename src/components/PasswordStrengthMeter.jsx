import React from 'react'
import zxcvbn from 'zxcvbn'

function PasswordStrengthMeter(props) {
  const createPasswordLabel = (result) => {
    let value = null
    if (result.password === '') {
      value = 0
    } else {
      value = result.score + 1
    }

    switch (value) {
      case 0:
        return ''
      case 1:
        return 'Weak'
      case 2:
        return 'Weak'
      case 3:
        return 'Fair'
      case 4:
        return 'Good'
      case 5:
        return 'Strong'
      default:
        return ''
    }
  }

  const calculateWidth = (result) => {
    const transitionStyle = 'width 0.5s ease-in-out'

    let value = null
    if (result.password === '') {
      value = 0
    } else {
      value = result.score + 1
    }

    switch (value) {
      case 0:
        return {
          width: '0%',
          backgroundColor: '#e5e7eb',
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
          width: '16%',
          backgroundColor: '#dd4b39',
          transition: transitionStyle,
        }
      case 3:
        return {
          width: '45%',
          backgroundColor: '#dd4b39',
          transition: transitionStyle,
        }
      case 4:
        return {
          width: '70%',
          backgroundColor: '#175ddc ',
          transition: transitionStyle,
        }
      case 5:
        return {
          width: '100%',
          backgroundColor: '#00a65a',
          transition: transitionStyle,
        }
      default:
        return {
          width: '16%',
          backgroundColor: '#e5e7eb',
          transition: transitionStyle,
        }
    }
  }

  const testedResult = zxcvbn(props.password)
  return (
    <div className="w-full rounded bg-gray-200 dark:bg-gray-700">
      <div
        className="h-4 rounded bg-red-400 p-0.5 text-center text-xs font-medium leading-none text-blue-100
        "
        style={calculateWidth(testedResult)}
      >
        <span className="font-bold">{createPasswordLabel(testedResult)}</span>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
