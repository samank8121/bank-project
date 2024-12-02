export const fetchPost = ({
  endpoint,
  body,
}: {
  endpoint: string;
  body: string;
}) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  });
};
