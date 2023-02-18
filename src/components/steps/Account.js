import { useStepperContext } from "../contexts/StepperContext";

export default function Account({onSubmit}) {
  const { userData, setUserData } = useStepperContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(`account user data: ${userData['username']} ${JSON.stringify(userData)}`);
    localStorage.setItem('registerData', JSON.stringify(userData));
  };

  return (
    <div className="flex flex-col ">
      <form className="mt-0 space-y-6 mx-0" onSubmit={handleSubmit}>
      <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["username"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["email"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["password"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="8+ Character"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="confirmpassword">
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["password"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
      {/* <button type="submit">Next</button> */}
      </form>
    </div>
  );
}
