import { InfinitySpin } from 'react-loader-spinner';

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <div>
      {isLoading && (
        <InfinitySpin
            width="200"
            color="#4fa94d"
        />
      )}
    </div>
  );
}
