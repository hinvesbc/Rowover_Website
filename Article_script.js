document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog-posts');
  
    // Fetch the blog posts from posts.json
    fetch('/pages/Articles/posts.json')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          
          // Image
          if (post.image) {
            const image = document.createElement('img');
            image.src = post.image;
            image.alt = post.title; // Use the title as the alt text for accessibility
            image.classList.add('post-image'); // Optional: Add a class for styling
            postElement.appendChild(image);
          }
  
          // Title
          const title = document.createElement('h2');
          title.textContent = post.title;
          postElement.appendChild(title);
          
          // Author and Date
          const meta = document.createElement('p');
          meta.textContent = `By ${post.author} on ${post.date}`;
          postElement.appendChild(meta);
          
          // Content (first 100 characters as a preview)
          const content = document.createElement('p');
          content.textContent = post.content.substring(0, 100) + '...';
          postElement.appendChild(content);
          
          // Link to read more
          const readMoreLink = document.createElement('a');
          readMoreLink.href = `articles/${post.slug}.html`; // Assuming each post has its own individual page
          readMoreLink.textContent = 'Read more';
          postElement.appendChild(readMoreLink);
          
          // Append the post to the container
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  });
  