import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import { fetchNotes } from '../../services/noteService'
import SearchBox from '../SearchBox/SearchBox'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import css from './App.module.css'

export default function App() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const updateDebouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value.trim())
    setPage(1)
  }, 300)

  const handleSearch = (value: string) => {
    setSearch(value)
    updateDebouncedSearch(value)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
  })

  const notes = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </header>

      {isLoading && <p role="status">Loading notes...</p>}
      {isError && <p role="alert">Something went wrong. Please try again.</p>}

      {!isLoading && !isError && notes.length === 0 && <p>No notes found.</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  )
}
