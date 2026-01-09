import { isAxiosError } from "axios";
import { notFound } from "next/navigation";

type Options = {
  serverErrorMessage?: string;
  fallbackMessage?: string;
};

export function handleApiError(
  error: unknown,
  options: Options = {}
): never {
  const {
    serverErrorMessage = "Server error",
    fallbackMessage = "예기치 못한 에러 발생",
  } = options;

  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 404) {
      notFound();
    }

    if (status && status >= 500) {
      throw new Error(serverErrorMessage);
    }
  }

  throw new Error(fallbackMessage);
}