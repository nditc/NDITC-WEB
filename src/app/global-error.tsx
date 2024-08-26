'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import ErrorComp from './Components/Error';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorComp statusCode={500} msg="Something Went Wrong!" action={reset} />
      </body>
    </html>
  );
}
