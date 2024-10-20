export const temperatureDescription = (temp: number) => {
  if (temp < 0) {
    return {
      description: 'freeze',
      color: '#00416A'
    }
  }

  if (temp < 10) {
    return {
      description: 'cold',
      color: '#7FB3D5'
    }
  }

  if (temp < 20) {
    return {
      description: 'cool',
      color: '#A2D9CE'
    }
  }

  if (temp < 30) {
    return {
      description: 'warm',
      color: '#FFA500'
    }
  }

    return {
      description: 'hot',
      color: '#FF6347'
    }
}
