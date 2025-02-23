interface TeachersPageProps {
  refetch: boolean;
}

const TeachersPage: React.FC<TeachersPageProps> = ({ refetch }) => {
  return <>{refetch.toString()}</>;
};

export default TeachersPage;
