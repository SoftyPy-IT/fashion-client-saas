import Container from "@/components/common/Container";
import VerificationForm from "../_components/VerificationForm";

const EmailVerificationPage = () => {
  return (
    <Container>
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px] py-10 lg:py-20">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 ">
            Verify your email address
          </h2>
          <VerificationForm />
        </div>
      </div>
    </Container>
  );
};

export default EmailVerificationPage;
