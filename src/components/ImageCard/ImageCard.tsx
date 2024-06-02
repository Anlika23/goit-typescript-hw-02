

interface Image {
    small: string;
    regular: string;
  }
  
  interface ImageCardProps {
    imageUrl: Image;
    openModal: (url: string) => void;
  }
  
  export default function ImageCard({ imageUrl, openModal }: ImageCardProps) {
    const handleClick = () => {
      openModal(imageUrl.regular);
    };
  
    return (
      <div>
        <img src={imageUrl.small} alt="Gallery Image" onClick={handleClick}/> 
      </div>
    );
  }
  