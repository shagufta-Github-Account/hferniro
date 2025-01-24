import { createClient } from 'next-sanity';

// Sanity configuration
export const client = createClient({
  projectId: 't2nykucn', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset
  apiVersion: '2021-03-25', // API version date
  token: 'sk366SJAPlZJbpYMpiz4mE1BUwEZhzcEBIrLKLJFodOlzqopN0H3xn6pj05m8LHSewcEohHjcwXX6QLva09zRA0BcufBxYFW7kVBEkCUiVqZtNVicq3gIhjoah1z7v8dgWIMc9ETt0KAbYMYmWI8oPuqqxnmg4JQRg00DZihqup23VhlK9xV', // Replace with your Sanity token
  useCdn: false, // Set to false for authenticated requests
});
