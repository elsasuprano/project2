async function newWatchHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#watch').value.trim();
    const model = document.querySelector('#model').value.trim();
    const price = document.querySelector('#price').value.trim();
    const condition = document.querySelector('#condition').value.trim();
    const location = document.querySelector('#location').value.trim();

    const response = await fetch(`/api/watch`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        model,
        price,
        condition,
        location
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/availability');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-watch').addEventListener('submit', newWatchHandler);