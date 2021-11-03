export const History = (props: { histories: string[] }) => {
  return (
    <div>
      <ul>
        {props.histories.map((history, index) => (
          <li key={index}>{history}</li>
        ))}
      </ul>
    </div>
  );
};
