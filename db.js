const db = {
    testimonials: [
      { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
      { id: '2', author: 'Amanda Doe', text: 'They really know how to make you happy.' },
      { id: '3', author: 'Jack Black', text: 'You must never underestimate the power of the eyebrow.' },
      { id: '4', author: 'Dave Grohl', text: 'I had no idea what I was doing and I faked it and it worked.' },
      { id: '5', author: 'David Gilmour', text: 'Everything in moderation - that\'s what I live by.' },
      { id: '6', author: 'John Lennon', text: 'I\'ve always been politically minded and against the status quo.' },
      { id: '7', author: 'Paul McCartney', text: 'Think globally, act locally.' },
      { id: '8', author: 'Jack White', text: 'I consider music to be storytelling, melody and rhythm.' },
      { id: '9', author: 'Ed Sheeran', text: 'I\'ve fallen for your eyes, but they don\'t know me yet.' },
      { id: '10', author: 'Freddy Mercury', text: 'I won\'t be a rock star.' },
    ],
    concerts: [
      { id: '1', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' },
      { id: '2', performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' },
      { id: '3', performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' },
    ],
    seats: [
      { id: '1', day: 1, seat: 3, client: 'Amanda Doe', email: 'amandadoe@example.com' },
      { id: '2', day: 1, seat: 9, client: 'Curtis Johnson', email: 'curtisj@example.com'  },
      { id: '3', day: 1, seat: 10, client: 'Felix McManara', email: 'felxim98@example.com'  },
      { id: '4', day: 1, seat: 26, client: 'Fauna Keithrins', email: 'mefauna312@example.com'  },
      { id: '5', day: 2, seat: 1, client: 'Felix McManara', email: 'felxim98@example.com'  },
      { id: '6', day: 2, seat: 2, client: 'Molier Lo Celso', email: 'moiler.lo.celso@example.com'  },
    ],
  }
  
  module.exports = db;