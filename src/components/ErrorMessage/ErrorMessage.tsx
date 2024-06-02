import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <p className={css.errorMessage}>{message}</p>
    </div>
  );
}
