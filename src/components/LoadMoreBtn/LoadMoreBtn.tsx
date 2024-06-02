import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

export default function LoadMoreBtn({ onLoadMore, hasMore }: LoadMoreBtnProps) {
  return (
    <div>
      {hasMore && (
        <button className={css.btnLoader} onClick={onLoadMore}>Load more</button>
      )}
    </div>
  );
}
