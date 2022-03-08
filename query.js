const spire = document.querySelector("#spirewidget");
const accessToken = spire.getAttribute("accessToken");
const widgetId = spire.getAttribute("widget");



export const widget = fetchWidget(
  `query {
    getWidgetByAccessToken(accessToken: "${accessToken}")
    {
        id,
        title,
        feedblocks,
        widgetStyles {
          brandColor,
          backgroundColor,
          titleTextColor,
          subTextColor
        },
        feedbackButtonStyles {
          buttonColor,
          textColor,
          buttonText,
          buttonPosition
        }
        status
    }
  }`
);



export const feedblocks = queryFetch(
    `query {
      listConsumerFeedblocks(widgetId: "${widgetId}")
      {
        data {
          id,
          title,
          widgetId,
          businessId,
          subTitle,
          slug
        }
      }
    }`
  );


  // export const feedback = createFeedback(
  //   `mutation{
  //       createFeedback(payload: {
  //         feedBlockId: "01ftzq0qkxswa1b3d3jxe6c17z",
  //         customerEmail: "essiensaviour.a@gmail.com",
  //         widgetName: "rating",
  //         rating: 2,
  //         comment: "Hello Wolrd",
  //         channel: website
  //       })
        
  //       {
  //         data,
  //         success,
  //         message,
  //       }
  //   }`
  // );



  async function fetchWidget(query) {
    const res = await fetch("https://fj-lite-node.herokuapp.com/graphql", {
      method: "POST",
      mode: "no-cors",
   
      body: JSON.stringify({
        query: query,
      }),
    });

    
  
    const response = await res.json();
    console.log(response.data.getWidgetByAccessToken);
    return response.data.getWidgetByAccessToken;
  }

  //fj-lite-node.herokuapp.com
  
  async function queryFetch(query) {
    const res = await fetch("https://fj-lite-node.herokuapp.com/graphql", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        query: query,
      }),
    });
  
    const response = await res.json();
    console.log(response.data.listConsumerFeedblocks.data);
    return response.data.listConsumerFeedblocks.data;
  }


  export async function createFeedback(feedblockId, customerEmail, widgetName, rating, comment) {
    const res = await fetch("https://fj-lite-node.herokuapp.com/graphql", {
      method: "POST",
      mode: "no-cors",
  
      body: JSON.stringify({
        query: `mutation {
            createFeedback(payload: {
              feedBlockId: "${feedblockId}",
              customerEmail: "${customerEmail}",
              media: {
                fileURL: "https://image.svg",
                category: image
              },
              rating: ${rating},
              comment: "${comment}",
              channel: website
            })
            
            {
              data,
              success,
              message,
            }
        }`,
      }),
    });
  
    const response = await res.json();
    console.log(response);
    return response;
  }
  
  
  //https://fj-lite-node.herokuapp.com/graphql
  //http://localhost:4000/graphql
  
  
