import React, { ReactElement } from 'react'
import HeadTag from '../component/Header'
import Theme from '../styles/Theme.module.css'
import { List, Card } from 'antd'
import { useRouter } from 'next/router'
import Image from 'next/image'


interface Props {
  // allStartDate_event: any
}

// export const getStaticProps: GetStaticProps = async () => {
//   const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
//   const TS = '1564731162583'
//   const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
//   const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
//   //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
//   const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
//   const startDate = `${API_URL}?orderBy=startDate&limit=75&offset=7&${AUTHforMarvel_API}`
//   const startDate_res = await fetch(startDate)
//   const startDate_data = await startDate_res.json() //object
//   const startDate_event = startDate_data.data.results //object


//   const test01 = ["ant", "bee", "cat", "dog"]
//   return {
//       props: { 
//         allStartDate_event: startDate_event
//       },// will be passed to the page component as props
//     }
// }

export default function AllEvent({}: Props): ReactElement {
  const router = useRouter()

  const getData = async () => {
    const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
    const TS = '1564731162583'
    const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
    const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
    //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
    const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
    const startDate = `${API_URL}?orderBy=startDate&limit=75&offset=7&${AUTHforMarvel_API}`
    const startDate_res = await fetch(startDate)
    const startDate_data = await startDate_res.json() //object
    const startDate_event = startDate_data.data.results //object
    setEvent(startDate_event)
  }

  const [event, setEvent] = React.useState([])
  
  React.useEffect(() => {
   
    getData()
    // Update the document title using the browser API
  });
  const data = event
  
  const pickEvent = (id: React.Key) => {
    console.log('pickEvent: ', id)
    const eventID = parseInt(id as string, 10)
    console.log(eventID)
    router.push({
      pathname: '/eventDetail/[eventID]',
      query: { eventID: eventID },
    })
  }

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


  return (
    <>
      <HeadTag/>  
      <div className={Theme.dark}>
        <h2 className={Theme.lightTextSubHeading} >Event Sort By Timeline&emsp;</h2>
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={data}
          rowKey={data => data.id}
          renderItem={event => (
            <List.Item>
              <Card
                hoverable
                bordered={false} 
                style={{ backgroundColor: '#ec1d24' }}
                bodyStyle={{border: 0 , padding: '0.5vmax 0 0'}}
                cover={
                  <Image
                  loader={myLoader}
                  src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`}
                  alt= {`${event.title}`}
                  width={250}
                  height={250}
                />
                // <img alt= {`${event.title}`} src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`} />
              }
                onClick={() => pickEvent(event.id)}
              >
                <h4 style={{ margin: '0 1px', textAlign: 'center' }} className={Theme.lightText}>{event.title}</h4>
                <h5 style={{ textAlign: 'center' }} className={Theme.lightText}>{event.start.slice(0,10)}</h5>
                {/* <Meta title= {<h3 style={{ margin: '0' }} className={Theme.lightText}>{event.title}</h3>} description={<h4 style={{ textAlign: 'center' }} className={Theme.lightText}>{event.start.slice(0,10)}</h4>} /> */}
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}