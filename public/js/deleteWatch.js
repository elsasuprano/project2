async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/watch/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          watch_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/availability/');
        alert('Watch has been deleted!');
      } else {
        alert(response.statusText);
      }
    
  }
  
  document.querySelector('#delete-watch-btn').addEventListener('click', deleteFormHandler);