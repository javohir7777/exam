import useAuth from "../store/auth";

const Skills = () => {
      const user = useAuth((state) => state.user);

  return (
    <div>User id:{user?._id}</div>
  )
}

export default Skills