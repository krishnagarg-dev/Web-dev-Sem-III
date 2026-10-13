export default function ListDisplay() {
  let listInfo = [
    { id: 1, name: "Java", scope: 50 },
    { id: 2, name: "Python", scope: 80 },
    { id: 3, name: "JavaScript", scope: 75 },
    { id: 4, name: "Mojo", scope: 2 },
    { id: 5, name: "Kotlin", scope: 40 },
  ];
  return (
    <div>
      <h1>Welcome to List of Languages:</h1>
      {listInfo.map((langObj) => {
        return (
          <li key={langObj.id}>
            {langObj.id}. Name:{langObj.name}=Sope:{langObj.scope}
          </li>
        );
      })}
    </div>
  );
}
