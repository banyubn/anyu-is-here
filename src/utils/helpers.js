export const getRandomPosition = () => ({
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%',
  animationDelay: Math.random() * 2 + 's',
})

export const getShapeStyle = (index) => {
  const shapes = [
    { left: '10%', top: '20%', size: '100px' },
    { left: '80%', top: '10%', size: '60px' },
    { left: '70%', top: '70%', size: '80px' },
    { left: '20%', top: '80%', size: '120px' },
    { left: '50%', top: '50%', size: '40px' },
  ]
  
  const shape = shapes[index - 1] || { left: '50%', top: '50%', size: '60px' }
  
  return {
    left: shape.left,
    top: shape.top,
    width: shape.size,
    height: shape.size,
    animationDelay: index * 0.5 + 's',
  }
}

export const getOrbitPosition = (index, total) => {
  const angle = (index / total) * 360
  const radius = 120
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  
  return {
    transform: `translate(${x}px, ${y}px)`,
    animationDelay: index * 0.2 + 's',
  }
}

export const get3DPosition = (index) => {
  const positions = [
    { left: '10%', top: '15%', animationDelay: '0s' },
    { left: '85%', top: '25%', animationDelay: '0.5s' },
    { left: '15%', top: '75%', animationDelay: '1s' },
    { left: '80%', top: '80%', animationDelay: '1.5s' },
    { left: '50%', top: '10%', animationDelay: '2s' },
    { left: '90%', top: '50%', animationDelay: '2.5s' },
    { left: '5%', top: '45%', animationDelay: '3s' },
    { left: '60%', top: '90%', animationDelay: '3.5s' },
  ]
  
  return positions[index - 1] || { left: '50%', top: '50%', animationDelay: '0s' }
}

export const isMobileDevice = () => {
  return (
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
}
