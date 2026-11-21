export function CoachPhoto({ detail = false }: { detail?: boolean }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}coach.jpg`}
      alt={detail ? '' : 'Паша Челюсть в белом ги с чёрным поясом'}
      width="1002"
      height="1280"
      loading={detail ? 'lazy' : undefined}
      fetchPriority={detail ? undefined : 'high'}
    />
  )
}
