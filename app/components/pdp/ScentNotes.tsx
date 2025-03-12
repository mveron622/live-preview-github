"use client";

import { useEffect, useState } from "react";

interface ScentNotesProps {
  scent_notes: {
    scent_notes: {
      scent_notes: {
        scent_notes_image: {
          url: string;
        };
        scent_notes_name: string;
      }[];
    }[];
  };
}

const ScentNotes = ({ scent_notes }: ScentNotesProps) => {
  const [scentNotes, setScentNotes] = useState<any>(undefined);

  useEffect(() => {
    let scent_notes_array: any = [];
    scent_notes?.scent_notes?.[0]?.scent_notes.forEach((note: any) => {
      if (note?.scent_notes_image?.url) {
        scent_notes_array.push({ image: note?.scent_notes_image?.url, scent_note_name: note?.scent_notes_name });
      }
    });
    if (scent_notes_array.length > 0) {
      setScentNotes(scent_notes_array);
    }
  }, [scent_notes]);

  return (
    <div>
      {scentNotes && scentNotes.length > 0 && (
        <div className="flex flex-row">
          {scentNotes.map((note: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={note.image}
                alt={`Scent Note ${index + 1}`}
                className="w-16 h-16 object-cover"
              />
              <p className="mt-2">{note.scent_note_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScentNotes;
