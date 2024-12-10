```jsx
// Update the handleReviewClick function in Profile.jsx
const handleReviewClick = (post) => {
  setSelectedPost(post);
  setShowReviewModal(true);
};

// Replace the ReviewModal rendering with:
{showReviewModal && selectedPost && (
  currentUser?.type === 'seller' ? (
    <SellerProductDetails
      post={selectedPost}
      onClose={() => {
        setShowReviewModal(false);
        setSelectedPost(null);
      }}
    />
  ) : (
    <ReviewModal
      post={selectedPost}
      onClose={() => {
        setShowReviewModal(false);
        setSelectedPost(null);
      }}
      onReplySubmit={handleReplySubmit}
    />
  )
)}
```