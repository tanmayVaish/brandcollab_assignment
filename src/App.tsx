import { useEffect, useState } from 'react'
import './App.css'
import EditIcon from '@mui/icons-material/Edit'
import CircularProgress from '@mui/material/CircularProgress'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'

// Interface for Profile data
interface Profile {
  name: string
  current_role: string
  current_company: string
  location: string
  skills: string[]
  about: string
  collaborations: string[]
  products: Product[]
  testimonials: Testimonial[]
}

// Interface for Product data
interface Product {
  name: string
  description: string
}

// Interface for Testimonial data
interface Testimonial {
  name: string
  review: string
}

const mockData: Profile = {
  name: 'Adrian Brewer',
  current_role: 'Engineer',
  current_company: 'BB Agency -Industry',
  location: 'San Francisco, CA',
  skills: ['Product Management', 'CX Strategy', 'UX Strategy'],
  about: `Hi, my name is Adrian Brewer, I'm the Co-founder and Head of Design at BB agency. Designer at heart. Head of Design might be an overstatement, but as with many 20 people agencies I need to wear many different hats....`,
  collaborations: ['coca cola'],
  products: [
    {
      name: 'Coca Cola',
      description: 'This is a Coca Cola product',
    },
    {
      name: 'Pepsi',
      description: 'This is a Pepsi product',
    },
  ],
  testimonials: [
    {
      name: 'John Doe',
      review: `Hi, my name is Adrian Brewer, I'm the Co-founder and Head of Design at BB agency. Designer at heart. Head of Design might be an overstatement, but as with many 20 people agencies I need to wear many different hats....`,
    },
  ],
}

function App() {
  // Profile state with default value of null
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await new Promise<Profile>((resolve) => {
        setTimeout(() => {
          resolve(mockData)
        }, 1000)
      })

      setProfile(response)
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white flex py-5 px-10 rounded-xl">
        {profile ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="text-2xl text-black font-bold">
                {profile.name}
              </div>
              <div className="text-gray-600">
                {profile.current_role} in {profile.current_company}
              </div>
              <div className="text-gray-600">{profile.location}</div>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              {profile.skills.map((skill, index) => {
                return (
                  <div
                    className="bg-gray-100 rounded-2xl py-2 px-5 text-gray-600"
                    key={index}
                  >
                    {skill}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex">
            <CircularProgress />
          </div>
        )}
        <div>
          <EditIcon />
        </div>
      </div>
      <div className="bg-white flex py-5 px-10 rounded-xl">
        <div className="flex-1 flex flex-col items-start gap-4">
          <div className="text-2xl text-black font-bold">About Me</div>
          {profile ? (
            <div className="text-gray-600 text-start">{profile.about}</div>
          ) : (
            <CircularProgress />
          )}
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
      <div className="bg-white flex flex-col py-5 px-10 rounded-xl gap-4">
        <div className="text-2xl text-black font-bold text-start">
          Previous Collaborate
        </div>
        <div className="flex flex-wrap gap-2">
          {profile ? (
            profile.collaborations.map((collaboration, index) => {
              return (
                <div key={index}>
                  <div
                    className="bg-gray-100 rounded-2xl py-2 px-5 text-gray-600"
                    key={index}
                  >
                    {collaboration}
                  </div>
                </div>
              )
            })
          ) : (
            <CircularProgress />
          )}
          <div className="flex items-center gap-2 bg-black text-white p-2 rounded-lg cursor-pointer">
            <AddIcon />
            Add Previous Collaboration
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col py-5 px-10 rounded-xl gap-4">
        <div className="text-2xl text-black font-bold text-start">
          Lets Collaborate
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-black text-white p-2 rounded-lg cursor-pointer">
            <AddIcon />
            Add Products
          </div>
        </div>

        {profile?.products.map((product) => {
          return (
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full">
                <div className="flex-1 text-start text-gray-700 font-bold text-xl">
                  {product.name}
                </div>
                <EditIcon />
              </div>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Explain here..."
              />
              <div className="w-full">
                <div className="justify-self-end bg-blue-500 text-white p-3 rounded-lg cursor-pointer">
                  Book Now
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white flex flex-col py-5 px-10 rounded-xl gap-4">
        <div className="flex justify-between">
          <div className="text-2xl text-black font-bold">Testimonials</div>
          <EditIcon />
        </div>
        <div className="">
          {profile?.testimonials.map((testimonial, index) => {
            return (
              <div key={index} className="flex flex-col w-full gap-2">
                <i className="text-gray-600 text-start flex-1 basis-2/4">
                  "{testimonial.review}"
                </i>

                <p className="text-black text-end font-extrabold">
                  -{testimonial.name}
                </p>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-2 bg-black text-white justify-center p-2 rounded-lg cursor-pointer">
          <AddIcon />
          Add Testimonial
        </div>
      </div>
    </div>
  )
}

export default App
