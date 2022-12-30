import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMyRequests } from '../redux/assigningSlice';
import { Alert, Button,Modal } from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

function MyRequests() {
  const dispatch = useDispatch();
  const myRequests = useSelector(state => state.assign.myRequests)
  const user = useSelector(state => state.users.user)
  const myBooks = useSelector(state => state.books.myBooks)
  const [details, setDetails] = useState(false) //modal to display more details
  const [openModal,setOpenModal]=useState(false);
  const [numRequest,setNumRequest]=useState(0);

  useEffect(() => {
    dispatch(fetchMyRequests(user.user_id))
  }, [])

  const give=()=>{
    setOpenModal(false);
    fetch(`/acceptReq`,{
      method:'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({
        book_assigning_id:myRequests[numRequest].book_assigning_id,
        receivedat:new Date().toISOString().split('T')[0],
        from_user:myRequests[numRequest].from_user,
      })
    }).then(res=>res.json())
    .then(msg=>console.log(msg))
    .catch(e=>console.log(e))
  }

  return (
    <>
      <h1>your books are requested!</h1>
      {myRequests.length > 0 ?
        myRequests.map(item => {
          return (
            <>
              <Alert color="info">
                <span>
                  <span className="font-medium">
                    Request for book:{myBooks.find(book => book.book_id === item.book_id).title}
                  </span>
                  <div className='flex '>
                    <Button outline={true} onClick={() => setDetails(true)}>more details</Button>
                    <Button onClick={()=>setOpenModal(true)}>give</Button>
                  </div>
                </span>
              </Alert>

            {/* //details modal */}
              <Modal show={details} onClose={()=>setDetails(false)}>
                <Modal.Header>
                  details
                </Modal.Header>
                <Modal.Body>
                  who requested?
                  email:
                  phone:
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={()=>setDetails(false)}>ok</Button>
                </Modal.Footer>
              </Modal>

              {/* are you sure modal */}
              <Modal show={openModal} popup={true} onClose={() => setOpenModal(false)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to give this book?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button gradientDuoTone='purpleToBlue' onClick={give}>
                                    Yes, I'm sure
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
          )
        }) : 'no requests for now'
      }
    </>
  )
}

export default MyRequests