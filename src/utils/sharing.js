export const shareContent = async (item) => {
  try {
    const text = `Check out this ${item.title} for ₹${item.price} on Saree Vali!`;
    const url = window.location.href;
    const shareData = {
      title: 'Saree Vali',
      text: text,
      url: url
    };

    // Try native sharing first
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return;
    }

    // Return true to show the modal as fallback
    return true;

  } catch (error) {
    console.error('Error sharing:', error);
    return true; // Show modal as fallback
  }
};