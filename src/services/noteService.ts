import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(
  page: number,
  search: string
): Promise<FetchNotesResponse> {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return response.data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const response = await notehubApi.post<Note>('/notes', note);

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
}
