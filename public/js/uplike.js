async function uplikeClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch('/api/watch/uplike', {
        method: 'PUT',
        body: JSON.stringify({
          watch_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(('Watch LIKED! Refresh the page.'))
      }
  }
  
  document.querySelector('#uplike-btn').addEventListener('click', uplikeClickHandler);