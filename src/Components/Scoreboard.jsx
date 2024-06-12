import { useState, useEffect } from "react";
import data from "../assets/finalstanding.json";
import logo from "../assets/1 (1).png";
import logo2 from "../assets/bahonar.png";
function Scoreboard() {
  const [users, setUsers] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);
  const fetchusers = async () => {
    const sorted = data?.scoreboard?.sort(
      (a, b) =>
        b.score.num_solved - a.score.num_solved ||
        a.score.total_time - b.score.total_time
    );
    setProblems(data.problems);
    setUsers(sorted);
  };

  const getColors = (problem) => {
    if (problem.first_to_solve == true) {
      return "bg-[#00DD00]";
    }
    if (problem.solved == true) {
      return "bg-[#88FF88]";
    }
    if (problem.num_pending > 0) {
      return "bg-yellow-400";
    }
    if (problem.num_judged > 0 && problem.solved == false) {
      return "bg-[#FF8888]";
    } else {
      return "bg-white";
    }
  };
  const getText = (problem) => {
    if (problem.solved == true) {
      return (
        <>
          <div className="text-[13px] font-semibold">{problem.time}</div>
          <div className="text-[11px]">{`${problem.num_judged} ${
            problem.num_judged == 1 ? "try" : "tries"
          }`}</div>
        </>
      );
    }

    if (problem.num_pending > 0) {
      return (
        <>
          <div className="text-[13px] font-semibold">
            {problem.num_judged + problem.num_pending}
          </div>
          <div className="text-[11px]">{`${
            problem.num_judged + problem.num_pending == 1 ? "try" : "tries"
          }`}</div>
        </>
      );
    }
    if (problem.num_judged > 0 && problem.solved == false) {
      return (
        <>
          <div className="text-[13px] font-semibold">0</div>
          <div className="text-[11px]">{`${problem.num_judged} ${
            problem.num_judged == 1 ? "try" : "tries"
          }`}</div>
        </>
      );
    } else {
      return <div>-</div>;
    }
  };

  return (
    <div className="py-8 w-[98%] mx-auto">
      <div className="flex justify-between items-center w-full overflow-auto no-scrollbar">
        <div className="-mt-4 min-w-fit">
          <img src={logo} className="h-44" />
        </div>
        <div className="flex flex-col items-center justify-center min-w-fit my-10">
          <div className="font-bold text-2xl mb-5 text-center">
            4th Saba Programming Contest
          </div>
          <div>Shahid Bahonar University,Kerman,Iran</div>
        </div>
        <div className="min-w-fit">
          <img src={logo2} className="h-44" />
        </div>
      </div>
      <div className="bg-white overflow-auto rounded border">
        <table className="w-full leading-normal">
          <thead className="rounded-tl-xl">
            <tr>
              <th className="pl-1 py-2.5 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-semibold text-gray-700 uppercase tracking-tighter border-l border">
                Rank
              </th>
              <th className="pl-2.5 pr-16 py-2.5 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-semibold text-gray-700 uppercase tracking-wider border-l border">
                Name
              </th>
              <th className="px-1 py-2.5 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-semibold text-gray-700 uppercase tracking-wider border-l border">
                Solved
              </th>
              <th className="px-2 py-2.5 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-semibold text-gray-700 uppercase tracking-wider border-l border">
                Time
              </th>
              {problems.map((item, i) => {
                return (
                  <th
                    key={i}
                    className={`px-5 py-2.5 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-semibold text-gray-700 uppercase tracking-wider border-l border text-[${item.color}]`}
                  >
                    <div
                      className="mx-auto rounded-full h-8 text-center w-8 flex items-center justify-center"
                      style={{
                        backgroundColor: item.color,
                        color:
                          i == 1 || i == 2 || i == 8 || i == 10
                            ? "white"
                            : "black",
                      }}
                    >
                      {item.shortName}
                    </div>
                  </th>
                );
              })}
              <th className="pr-1 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-tight break-words">
                Solve
                <br /> Attmp
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td className="py-2 border-b border-gray-200 bg-white text-sm text-center border-l border">
                  {i + 1}
                </td>
                <td className="pl-2.5 pr-16 py-2 border-b border-gray-200 bg-white text-sm text-center border-l border text-nowrap">
                  <>
                    <div className="text-[17px] text-left">
                      {user?.participant?.name}
                    </div>
                    <div className="text-left text-sm">
                      {user.participant.university}
                    </div>
                  </>
                </td>
                <td className="px-0.5 py-2 border-b border-gray-200 bg-white text-sm text-center border-l border">
                  {user.score.num_solved}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-200 bg-white text-sm text-center border-l border">
                  {user.score.total_time}
                </td>

                {problems.map((p, i) => {
                  return (
                    <td
                    key={i}
                      className={`px-2.5 py-2 border-b border-gray-200 text-sm text-center border-l border ${getColors(
                        user.problems[i]
                      )}`}
                    >
                      {getText(user.problems[i])}
                    </td>
                  );
                })}
                <td
                  className={` py-2 border-b border-gray-200 text-sm text-center`}
                >
                  <>
                    <div className="text-base font-semibold">
                      {user.score.num_solved}
                    </div>
                    <div className="text-sm">{user.total_attempt}</div>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scoreboard;
