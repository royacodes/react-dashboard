import { useStepperContext } from "../contexts/StepperContext";

export default function Details({onSubmit}) {
  const { userData, setUserData } = useStepperContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    localStorage.setItem('registerData', userData);
    console.log(`account user data: ${userData['username']} ${JSON.stringify(userData)}`);
    localStorage.setItem('registerData', JSON.stringify(userData));
  };
  return (
    <div className="flex flex-col ">

      <form className="mt-0 space-y-6 mx-0" onSubmit={handleSubmit}>
      <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["firstName"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["lastName"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["phoneNumber"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="09*********"
                />
              </div>
      </form>
    </div>
  );
}
