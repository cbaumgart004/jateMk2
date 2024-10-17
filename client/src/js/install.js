const butInstall = document.getElementById('buttonInstall')

// Store the event globally to trigger later
let deferredPrompt

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault()

  // Save the event so it can be triggered later
  deferredPrompt = event

  // Make the install button visible
  butInstall.style.display = 'block'

  console.log('👍', 'beforeinstallprompt', event)
})

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return
  }

  // Show the install prompt
  deferredPrompt.prompt()

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  console.log('User response to the install prompt:', outcome)

  // Reset the deferredPrompt variable
  deferredPrompt = null

  // Hide the install button after the prompt has been handled
  butInstall.style.display = 'none'
})

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event)
  // Optionally, hide the install button
  butInstall.style.display = 'none'
})
