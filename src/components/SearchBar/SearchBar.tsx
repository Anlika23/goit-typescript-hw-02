import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { CgSearch } from "react-icons/cg";
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValue = query.trim(); 

    if (inputValue === '') { 
      toast.error('Please enter text to search images'); 
      return; 
    }
    onSubmit(inputValue); 
    setQuery(''); 
  };

  return (
    <header className={css.containerForm}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.btmSearch} type="submit"><CgSearch />Search</button>
      </form>
    </header>
  );
}
