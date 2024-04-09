document.addEventListener('DOMContentLoaded', () => {
  const filmsList = document.getElementById('films');
  const poster = document.getElementById('poster');
  const title = document.getElementById('title');
  const description = document.getElementById('film-info');
  const showtime = document.getElementById('showtime');
  const ticketNum = document.getElementById('ticket-num');
  const buyTicketBtn = document.getElementById('buy-ticket');

  // Fetch the details of the first movie when the page loads
  fetchMovieDetails(1);

  // Function to fetch movie details by ID
  function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
      .then(response => response.json())
      .then(movie => {
        poster.src = movie.poster;
        title.textContent = movie.title;
        description.textContent = movie.description;
        showtime.textContent = movie.showtime;
        const remainingTickets = movie.capacity - movie.tickets_sold;
        ticketNum.textContent = `${remainingTickets} remaining tickets`;
        buyTicketBtn.disabled = remainingTickets === 0;
        if (remainingTickets === 0) {
          buyTicketBtn.textContent = 'Sold Out';
        }
      })
      .catch(error => console.error('Error fetching movie details:', error));
  }

  // Event listener for clicking on a movie title
  filmsList.addEventListener('click', event => {
    if (event.target.classList.contains('film')) {
      const movieId = event.target.dataset.id;
      fetchMovieDetails(movieId);
    }
  });

  // Event listener for buying a ticket
  buyTicketBtn.addEventListener('click', () => {
    let remainingTickets = parseInt(ticketNum.textContent);
    if (remainingTickets > 0) {
      remainingTickets--;
      updateRemainingTickets(remainingTickets);
      if (remainingTickets === 0) {
        buyTicketBtn.disabled = true;
        buyTicketBtn.textContent = 'Sold Out';
      }
    } else {
      alert('Sorry, this movie is sold out!');
    }
  });

  // Function to update remaining ticket count
  function updateRemainingTickets(remaining) {
    ticketNum.textContent = `${remaining} remaining tickets`;
  }
});
