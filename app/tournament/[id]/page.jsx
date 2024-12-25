"use client";
import Error from "@/app/components/Error/Error";
import Loading from "@/app/components/Loading/Loading";
import { useModal } from "@/app/context/ModalContext";
import useFetch from "@/app/hooks/useFetch";
import { useParams } from "next/navigation";

export default function Tournament () {
  const { id } = useParams();
  const { setContent } = useModal();

  const { data, setData, error, loading } = useFetch(`/api/tournament/${id}`);
  
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  return (
    <main>
    </main>
  );
};