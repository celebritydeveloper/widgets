import { feedblocks, feedback, createFeedback, widget } from "https://cdn.jsdelivr.net/gh/celebritydeveloper/widgets/query.js";

feedblocks.then(function(params) {
  console.log(params);
});


//feedjet class constructor
export class Feedjet {
  constructor({ position = "bottom-right" } = {}) {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialise();
    this.createStyles();
    this.feedblock1Toggle();
    this.feedblock1FormToggle();
    this.feedblock2toggle();
    this.feedblock3toggle();
    this.formCompletion
    this.repositionCancelIconAndContainer()
  }
  //get the inputted position property
  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  repositionCancelIconAndContainer () {
    //resize function
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        console.log(entry.contentRect.height)
        if (Math.floor(entry.contentRect.height) == 337) {
            this.cancelIcon.style.bottom = "94.6%"
        }
        else if (Math.floor(entry.contentRect.height) == 188 || Math.floor(entry.contentRect.height) == 192) {
          this.cancelIcon.style.bottom = "91.4%"
          this.widjetContainer.style.top = "70.2%"
        } else if (Math.floor(entry.contentRect.height) == 543 || Math.floor(entry.contentRect.height) == 548) {
          this.cancelIcon.style.bottom = "96.4%"
          this.widjetContainer.style.top = "48%"
        } else if (Math.floor(entry.contentRect.height) == 212) {
          this.cancelIcon.style.bottom = "92.6%"
        } else if (Math.floor(entry.contentRect.height) == 119) {
          this.cancelIcon.style.bottom = "90.6%"
        } else if (Math.floor(entry.contentRect.height) == 332 || Math.floor(entry.contentRect.height) == 335) {
          this.cancelIcon.style.bottom = "94.4%"
          this.widjetContainer.style.top = "61.4%"
        } else if (Math.floor(entry.contentRect.height) == 551) {
          this.widjetContainer.style.top = "47.5%"
          this.cancelIcon.style.bottom = "96.4%"
        } else if (Math.floor(entry.contentRect.height) == 479) {
          this.widjetContainer.style.top = "52.4%"
          this.cancelIcon.style.bottom = "95.9%"
        }
      })
    })

    myObserver.observe(this.widjetParent)

  }

  //initialisation function
  initialise() {
    //MAKE A FETCH REQUEST TO THE GRAPHQL API - login


    const container = document.createElement("div");
    container.setAttribute("id", "container");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("feedback-button");
    //button toggle function for widget container
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));
    this.buttonContainer = buttonContainer
    //Button Text for the feejet Button
    const buttonText = document.createElement("p");

    const feedbackIcon = document.createElement("img");
    feedbackIcon.src = "";
    feedbackIcon.alt = "";
    this.feedbackIcon = feedbackIcon;

    const loader = document.createElement("div");
    loader.classList.add("lds-ripple");
    const loaderDivOne = document.createElement("div");
    const loaderDivTwo = document.createElement("div");
    //const loaderDivThree = document.createElement("div");
    loader.append(loaderDivOne, loaderDivTwo);

    buttonContainer.appendChild(loader);


    widget.then(function(res) {
      console.log(res);
      if(res == null) {
        console.log("No");
        feedbackIcon.src = "";
        buttonText.textContent = "Error Loading Widget...";
        buttonText.classList.add("feedback-button__text-error");
        buttonContainer.classList.remove("feedback-button-hover");
        buttonContainer.disabled = true;
        loader.style.display = "none";
        buttonContainer.addEventListener("mouseover", function(event) {
          console.log(event);
          console.log("Hello");
          //buttonContainer.setAttribute("style", "border: none;");
          buttonContainer.style.border = "none";
  
        }, false);
        
      } else if(res.feedbackButtonStyles.buttonText) {
        console.log("Yes");
        feedbackIcon.src = require("../image/icon-feedback.svg");
        loader.style.display = "none";
        buttonText.classList.add("feedback-button__text");
        buttonContainer.classList.add("feedback-button-hover");
        feedbackIcon.classList.add("icon");
        feedbackIcon.alt = "a speaker icon";
        buttonText.textContent = res.feedbackButtonStyles.buttonText;
      }
    });


    // if(buttonText.textContent = "Error Loading Widget...") {
    //   buttonContainer.addEventListener("mouseover", function(event) {
    //     console.log(event);
    //     console.log("Hello");
    //     //buttonContainer.setAttribute("style", "border: none;");
    //     buttonContainer.style.border = "none";

    //   }, false);
    // }
    
    // buttonText.textContent = this.data[0].feedjetButton ? `${this.data[0].feedjetButton}` : 'Leave a feedback'

    

    const cancelIcon = document.createElement("img");
    cancelIcon.src = require("../image/cancel-icon.svg");
    cancelIcon.alt = "an icon to close the widjet container";
    cancelIcon.classList.add("cancel-icon");
    cancelIcon.setAttribute("tabindex", 0);
    this.cancelIcon = cancelIcon;
    cancelIcon.addEventListener("click", this.toggleOpen.bind(this));
    cancelIcon.addEventListener('keypress',(e) => {
      if(e.key == 'Enter') {
        this.toggleOpen()
        this.buttonContainer.focus()
        //so I want to access the toggleOpen function from inside of this callback function, how do I do that?
      }
    })

    //I wonder, why did I initialize the widjetContainer here with the this keyword and not a constant
    this.widjetContainer = document.createElement("article");
    this.widjetContainer.classList.add("hidden", "widjet-container");

    //create all the content for the widjet container
    this.createWidjetContainerContent();
    //append icon and text to the button container
    buttonContainer.appendChild(this.feedbackIcon);
    buttonContainer.appendChild(buttonText);
    //append widjet container to the document body
    document.body.appendChild(this.widjetContainer);
    container.appendChild(buttonContainer);
  }
  //function for the content of the widjet container
  createWidjetContainerContent() {
    //widjet itself
    const widjetParent = document.createElement("div");
    widjetParent.classList.add("widjet-parent");
    this.widjetParent = widjetParent

    const companyInformation = document.createElement("header");
    companyInformation.classList.add("header");
    //this section would contain the fetch request for the
    //company logo and name;
    const companyLogo = document.createElement("span");
    const companyName = document.createElement("h1");

    const widjet = document.createElement("div");
    widjet.classList.add("widjet__itself");
    widjet.setAttribute("id", "widjet__itself");

    const genericDiv = document.createElement("div");
    genericDiv.classList.add("feedblocks-container");

    //widjet children
    const widjetChild1 = document.createElement("section");
    const widjetChild2 = document.createElement("section");
    const widjetChild3 = document.createElement("section");
    widjetChild1.classList.add("widjet__child");
    widjetChild1.setAttribute("id", "fb1");
    widjetChild2.classList.add("widjet__child");
    widjetChild2.setAttribute("id", "fb2");
    widjetChild3.classList.add("widjet__child");
    widjetChild3.setAttribute("id", "fb3");
    //Forms for widjetChild 1

    //widjet text containers
    const textContainer1 = document.createElement("div");
    textContainer1.classList.add("widjet__child__text");
    textContainer1.setAttribute("tabindex", 0);

    const textContainer2 = document.createElement("div");
    textContainer2.classList.add("widjet__child__text");
    textContainer2.setAttribute("tabindex", 0);

    const textContainer3 = document.createElement("div");
    textContainer3.classList.add("widjet__child__text");
    textContainer3.setAttribute("tabindex", 0);

    //textContainerschildren
    const img1 = document.createElement("img");
    img1.src = require("../image/icon-emotion.svg");
    img1.alt = "an emotion icon";
    img1.classList.add("widjet__child__icon");

    const img2 = document.createElement("img");
    img2.src = require("../image/icon-warning.svg");
    img2.alt = "a warning icon";
    img2.classList.add("widjet__child__icon");

    const img3 = document.createElement("img");
    img3.src = require("../image/icon-idea.svg");
    img3.alt = "an idea icon";
    img3.classList.add("widjet__child__icon");

    const title1 = document.createElement("h3");
    title1.classList.add("title");
    title1.setAttribute("id", "title1");
    title1.setAttribute("tabindex", 0);

    const title2 = document.createElement("h3");
    title2.classList.add("title");
    title2.setAttribute("id", "title2");
    title2.setAttribute("tabindex", 0);

    const title3 = document.createElement("h3");
    title3.classList.add("title");
    title3.setAttribute("id", "title3");
    title3.setAttribute("tabindex", 0);


    let widgetName = "";
    let ratingFeedblock = "";
    let issueFeedblock = "";
    let featureFeedblock = "";
  

    const link1 = document.createElement("a");
    const link2 = document.createElement("a");
    const link3 = document.createElement("a");


    //title hyperlinks
    

    //text details for each textcontainer parent
    const details1 = document.createElement("p");
    details1.classList.add("details");
    

    const details2 = document.createElement("p");
    details2.classList.add("details");
    

    const details3 = document.createElement("p");
    details3.classList.add("details");

    //add title and details to the text container
    textContainer1.append(title1, details1);
    textContainer2.append(title2, details2);
    textContainer3.append(title3, details3);

    widjetChild1.append(img1, textContainer1);
    widjetChild2.append(img2, textContainer2);
    widjetChild3.append(img3, textContainer3);



    
    

    //Form elements for each individual widjet child element
    //these child element would include the rate your experince feedblock,
    // leave a feedback feedblock and report an issues feedblock

    //note: fb1
    const rateYourExperienceContainer = document.createElement("div");
    rateYourExperienceContainer.classList.add("feedblock-container1");
    // the h3 is going to be taken from the already created title1 and inserted into the container
    //same with the ratingDetails text
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.classList.add("back-button");
    const backImg = document.createElement("img");
    backImg.src = require("../image/arrow.svg");
    backImg.alt = "arrow icon";
    backImg.classList.add("widjet__child__ico");
    backButton.appendChild(backImg);


    const ratingTitle = link1.cloneNode(true);
    ratingTitle.classList.add("title");
    const ratingDetails = details1.cloneNode(true);
    ratingDetails.classList.add("details", "fb1__details");

    //rating with stars section
    const ratingStarsContainer = document.createElement("div");
    ratingStarsContainer.classList.add("feedblock-container__ratingStar");
    const starRating = document.createElement("div");
    starRating.classList.add("star-rating");
    const fiveStar = document.createElement("input");
    fiveStar.setAttribute("id", "star-a");
    fiveStar.setAttribute("value", 5);
    const fiveStarLabel = document.createElement("label");
    fiveStarLabel.setAttribute("for", "star-a");

    const fourStar = document.createElement("input");
    fourStar.setAttribute("id", "star-b");
    fourStar.setAttribute("value", 4);
    const fourStarLabel = document.createElement("label");
    fourStarLabel.setAttribute("for", "star-b");

    const threeStar = document.createElement("input");
    threeStar.setAttribute("id", "star-c");
    threeStar.setAttribute("value", 3);
    const threeStarLabel = document.createElement("label");
    threeStarLabel.setAttribute("for", "star-c");

    const twoStar = document.createElement("input");
    twoStar.setAttribute("id", "star-d");
    twoStar.setAttribute("value", 2);
    const twoStarLabel = document.createElement("label");
    twoStarLabel.setAttribute("for", "star-d");

    const oneStar = document.createElement("input");
    oneStar.setAttribute("id", "star-e");
    oneStar.setAttribute("value", 1);
    const oneStarLabel = document.createElement("label");
    oneStarLabel.setAttribute("for", "star-e");

    oneStar.addEventListener("click", function() {
      console.log(oneStar.value);
    })

    twoStar.addEventListener("click", function() {
      console.log(twoStar.value);
    })

    const stars = [fiveStar, fourStar, threeStar, twoStar, oneStar];
    stars.map((star) => {
      star.type = "radio";
      star.name = "stars";
    });
    starRating.append(
      fiveStar,
      fiveStarLabel,
      fourStar,
      fourStarLabel,
      threeStar,
      threeStarLabel,
      twoStar,
      twoStarLabel,
      oneStar,
      oneStarLabel
    );


    ratingStarsContainer.append(starRating);

    const feedblockForm = document.createElement("form");
    feedblockForm.classList.add("feedblock1__form-itself");
    feedblockForm.setAttribute("method", "post");

    const emailField = document.createElement("input");
    emailField.classList.add("feedblock__form__email");
    emailField.type = "email";
    emailField.name = "email";
    emailField.placeholder = "example@gmail.com";
    emailField.setAttribute("id", "email");
    emailField.setAttribute("required", true);
    emailField.setAttribute("autofill", true);

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "What's your email?";
    emailLabel.setAttribute("for", "email");
    emailLabel.classList.add("fb1__email");
    const emailExtraDetails = document.createElement("span");
    emailExtraDetails.textContent = " Required";
    emailExtraDetails.classList.add("fb1__email__required");
    emailLabel.appendChild(emailExtraDetails);

    const commentLabel = document.createElement("label");
    commentLabel.textContent = "Leave us a comment";
    commentLabel.classList.add("fb1__comment");
    const commentLabelExtraDetails = document.createElement("span");
    commentLabel.setAttribute("for", "comment");
    commentLabelExtraDetails.textContent = "Required";
    commentLabelExtraDetails.classList.add("fb1__email__required");
    commentLabelExtraDetails.classList.add("fb1__comment__optional");
    commentLabel.appendChild(commentLabelExtraDetails);

    const commentField = document.createElement("textarea");
    commentField.classList.add("feedblock__form__comment");
    commentField.placeholder = "Let us know how we can improve";
    commentField.setAttribute("required", true);
    commentField.setAttribute("id", "comment");
    commentField.name = "comment";
    //submit-button
    const submitButton = document.createElement("input");
    submitButton.classList.add("feedblock__form__submit");
    submitButton.setAttribute("type", "submit");
    submitButton.value = "Submit";

    const loading = document.createElement("div");
    loading.classList.add("loading");
    const loadingDivOne = document.createElement("div");
    const loadingDivTwo = document.createElement("div");
    loading.append(loadingDivOne, loadingDivTwo);
    loading.style.display = "none";
    submitButton.append(loading);
  

    feedblockForm.append(
      emailLabel,
      emailField,
      commentLabel,
      commentField,
      submitButton
    );


    rateYourExperienceContainer.append(
      backButton,
      ratingTitle,
      ratingDetails,
      ratingStarsContainer,
      feedblockForm
    );
    

    feedblockForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const getSelectedRating = `${document.querySelector('input[name="stars"]:checked').value}`;
      console.log(getSelectedRating);
      const ryeFormData = new FormData(feedblockForm)
      ryeFormData.append("rating", getSelectedRating || 0);
      ryeFormData.append("id", ratingFeedblock);

      loading.style.display = "block";
      submitButton.value = "";

      this.formSubmission(ryeFormData).then((res) => {
        submitButton.value = "Submitting...";
        console.log(res);
        if(res == null || !res) {
          console.log("hhhg");
        } else if(res.data) {
          loading.style.display = "none";
          console.log("Hello world");
        }
      })
      
      // this.formSubmission(ryeFormData);
      // if(this.formSubmission == null) {
      //   console.log("hhhg");
      // } else if(this.formSubmission) {
      //   console.log(this.formSubmission(ryeFormData));
        
      //   console.log("Hello world");
      // }
      //this.formCompletion()
    });

    









    //Report an Issue feedblock
    const reportAnIssueContainer = document.createElement("div");
    reportAnIssueContainer.classList.add("feedblock-container2");

    const issueTitle = link2.cloneNode(true);
    issueTitle.classList.add("title");
    const issueDetails = details2.cloneNode(true);
    issueDetails.classList.add("details", "fb2__details");

    const issueForm = document.createElement("form");
    issueForm.classList.add("feedblock2__form-itself");
    issueForm.setAttribute("enctype", "multipart/form-data");

    const issueEmailField = emailField.cloneNode(true);
    issueEmailField.classList.add("feedblock__form__email");
    issueEmailField.type = "email";
    issueEmailField.name = "email";
    issueEmailField.placeholder = "example@gmail.com";
    issueEmailField.setAttribute("id", "issue-email");
    issueEmailField.setAttribute("required", true);

    const issueEmailLabel = emailLabel.cloneNode(true);
    issueEmailLabel.textContent = "What's your email?";
    issueEmailLabel.setAttribute("for", "issue-email");
    issueEmailLabel.classList.add("fb1__email");

    const issueEmailExtraDetails = emailExtraDetails.cloneNode(true);
    issueEmailExtraDetails.textContent = "Required";
    issueEmailExtraDetails.classList.add("fb1__email__required");
    issueEmailLabel.appendChild(issueEmailExtraDetails);

    const issueCommentLabel = commentLabel.cloneNode(true);
    issueCommentLabel.textContent = "Leave us a comment";
    issueCommentLabel.classList.add("fb1__comment");

    const issueCommentLabelExtraDetails =
      commentLabelExtraDetails.cloneNode(true);
    issueCommentLabelExtraDetails.textContent = "Required";
    issueCommentLabelExtraDetails.classList.add("fb1__email__required");
    issueCommentLabel.appendChild(issueCommentLabelExtraDetails);

    const issueCommentField = commentField.cloneNode(true);
    issueCommentField.classList.add("feedblock__form__comment");
    issueCommentField.placeholder =
      "Tell us more about the issue you're having. You can take a screenshot.";
    issueCommentField.setAttribute("required", true);

    const imageUploadLabel = document.createElement("label");
    imageUploadLabel.textContent = "Take screenshot";
    imageUploadLabel.setAttribute("for", "screenshot");
    imageUploadLabel.classList.add("file-upload");

    const screenshotIcon = document.createElement("img");
    screenshotIcon.src = require("../image/iconCamera.svg");

    const screenshotInput = document.createElement("input");
    screenshotInput.type = "file";
    screenshotInput.setAttribute("id", "screenshot");
    screenshotInput.name = "screenshot";

    imageUploadLabel.append(screenshotIcon, screenshotInput);

    const issueSubmitButton = submitButton.cloneNode(true);
    issueSubmitButton.classList.add("feedblock__form__submit", "fb2__submit");

    issueForm.append(
      issueEmailLabel,
      issueEmailField,
      issueCommentLabel,
      issueCommentField,
      imageUploadLabel,
      issueSubmitButton
    );

    reportAnIssueContainer.append(issueTitle, issueDetails, issueForm);

    // issueForm.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   const issueFormData = new FormData(issueForm);
    //   issueFormData.append("rating", 0);
    //   issueFormData.append("id", issueFeedblock);
    //   //formData.append("upload_preset", "business_logos");
    //   // for (let [, issue] of issueFormData) {
    //   //   formArr.push(issue)
    //   //   console.log(issue);
    //   // }
    //   this.issueFormSubmission(issueFormData);
    // });

    issueForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const issueFormData = new FormData(issueForm);
      issueFormData.append("rating", 0);
      issueFormData.append("id", issueFeedblock);
      //formData.append("upload_preset", "business_logos");
      // for (let [, issue] of issueFormData) {
      //   formArr.push(issue)
      //   console.log(issue);
      // }

      loading.style.display = "block";
      issueSubmitButton.value = "";
      
      this.issueFormSubmission(issueFormData).then((res) => {
        issueSubmitButton.value = "Submitting...";
        console.log(res);
        if(res == null || !res) {
          console.log("hhhg");
        } else if(res.data) {
          loading.style.display = "none";
          console.log("Hello world");
        }
      })
    })


    // feedblockForm.addEventListener("submit", (e) => {
    //   e.preventDefault()
    //   const getSelectedRating = `${document.querySelector('input[name="stars"]:checked').value}`;
    //   console.log(getSelectedRating);
    //   const ryeFormData = new FormData(feedblockForm)
    //   ryeFormData.append("rating", getSelectedRating || 0);
    //   ryeFormData.append("id", ratingFeedblock);

    //   loading.style.display = "block";
    //   issueSubmitButton.value = "";

    //   this.formSubmission(ryeFormData).then((res) => {
    //     issueSubmitButton.value = "Submitting...";
    //     console.log(res);
    //     if(res == null || !res) {
    //       console.log("hhhg");
    //     } else if(res.data) {
    //       loading.style.display = "none";
    //       console.log("Hello world");
    //     }
    //   })
      
    //   // this.formSubmission(ryeFormData);
    //   // if(this.formSubmission == null) {
    //   //   console.log("hhhg");
    //   // } else if(this.formSubmission) {
    //   //   console.log(this.formSubmission(ryeFormData));
        
    //   //   console.log("Hello world");
    //   // }
    //   //this.formCompletion()
    // });

    
    //end of report an issue heading and form content



    






    //feature request section
    //this is the section for asking for a feature

    const featureRequestContainer = document.createElement("div");
    featureRequestContainer.classList.add("feedblock-container3");

    const featureTitle = link3.cloneNode(true);
    featureTitle.classList.add("title");
    const featureDetails = details3.cloneNode(true);
    featureDetails.classList.add("details", "fb3__details");

    const featureForm = document.createElement("form");
    featureForm.classList.add("feedblock3__form-itself");

    const featureEmailField = emailField.cloneNode(true);
    featureEmailField.classList.add("feedblock__form__email");
    featureEmailField.type = "email";
    featureEmailField.name = "email";
    featureEmailField.placeholder = "example@gmail.com";
    featureEmailField.setAttribute("id", "feature-email");
    featureEmailField.setAttribute("required", true);

    const featureEmailLabel = emailLabel.cloneNode(true);
    featureEmailLabel.textContent = "What's your email?";
    featureEmailLabel.setAttribute("for", "feature-email");
    featureEmailLabel.classList.add("fb1__email");

    const featureEmailExtraDetails = emailExtraDetails.cloneNode(true);
    featureEmailExtraDetails.textContent = "Required";
    featureEmailExtraDetails.classList.add("fb1__email__required");
    featureEmailLabel.appendChild(featureEmailExtraDetails);

    const featureCommentLabel = commentLabel.cloneNode(true);
    featureCommentLabel.textContent = "Tell us about this feature";
    featureCommentLabel.classList.add("fb1__comment");

    const featureCommentLabelExtraDetails =
      commentLabelExtraDetails.cloneNode(true);
    featureCommentLabelExtraDetails.textContent = "Required";
    featureCommentLabelExtraDetails.classList.add(
      "fb1__email__required",
      "fb3__comment__required"
    );
    featureCommentLabel.appendChild(featureCommentLabelExtraDetails);

    const featureCommentField = commentField.cloneNode(true);
    featureCommentField.classList.add("feedblock__form__comment");
    featureCommentField.placeholder =
      "What are you looking to see and what's the problem it solves?";
    featureCommentField.setAttribute("required", true);

    const requestAFeatureButton = submitButton.cloneNode(true);
    requestAFeatureButton.classList.add(
      "feedblock__form__submit",
      "fb3__submit"
    );

    featureForm.append(
      featureEmailLabel,
      featureEmailField,
      featureCommentLabel,
      featureCommentField,
      requestAFeatureButton
    );

    featureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const featureFormData = new FormData(featureForm)
      //this.FeatureFormData = FeatureFormData;

      featureFormData.append("rating", 0);
      featureFormData.append("id", featureFeedblock);
      // for (let [, issue] of issueFormData) {
      //   formArr.push(issue)
      //   console.log(issue);
      // }
      ;
      loading.style.display = "block";
      requestAFeatureButton.value = "";
      
      this.featureFormSubmission(featureFormData).then((res) => {
        requestAFeatureButton.value = "Submitting...";
        console.log(res);
        if(res == null || !res) {
          console.log("hhhg");
        } else if(res.data) {
          loading.style.display = "none";
          console.log("Hello world");
        }
      })
    })


    featureRequestContainer.append(featureTitle, featureDetails, featureForm);




    feedblocks.then(function(params) {
      console.log(params);

        if(params[2]) {
          link1.textContent = params[2].title;
          title1.appendChild(link1);
          details1.textContent = params[2].subTitle;
          ratingFeedblock = params[2].id;

          ratingTitle.textContent = params[2].title;
          ratingDetails.textContent = params[2].subTitle;
        } else {
          img1.style.display = "none";
        }


        if(params[0]) {
          link2.textContent = params[0].title;
          title2.appendChild(link2);
          details2.textContent = params[0].subTitle;
          issueFeedblock = params[0].id;

          issueTitle.textContent = params[0].title;
          issueDetails.textContent = params[0].subTitle;
        } else {
          img2.style.display = "none";
        }

        if(params[1]) {
          link3.textContent = params[1].title;
          title3.appendChild(link3);
          details3.textContent = params[1].subTitle;
          featureFeedblock = params[1].id;
          
          featureTitle.textContent = params[1].title;
          featureDetails.textContent = params[1].subTitle;
        } else {
          img3.style.display = "none";
        }
        
        
    });








    //append all child element to the genericDiv
    genericDiv.append(widjetChild1, widjetChild2, widjetChild3);

    //widget logo
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("spireLogo-container");

    const spireLogo = document.createElement("img");
    spireLogo.src = require("../image/logo.svg");
    spireLogo.alt =
      "a round object with a rectangular object next to it denoting a logo";
    spireLogo.classList.add("spireLogo__image");

    const spireLogoText = document.createElement("span");
    spireLogoText.classList.add("spireLogo__text");
    spireLogoText.textContent = "Powered by ";

    const spireText = document.createElement("span");
    spireText.textContent = "Spirē";
    spireText.classList.add("spire__text");
    spireLogoText.appendChild(spireText);
    //append the spireLogo and the spireLogoText to the icon container
    iconContainer.append(spireLogo, spireLogoText);
    this.iconContainer = iconContainer

    widjet.append(
      genericDiv,
      rateYourExperienceContainer,
      reportAnIssueContainer,
      featureRequestContainer,
      iconContainer,
    );

    widjetParent.append(widjet,this.cancelIcon);
    this.widjetContainer.append(widjetParent);
    
  }

  // -m "Fetch widget dynamically" -m "Added widgetId to the script" -m "list feedbacks" -m "Added submitting placeholders when sending form"

  //toogle function for the widjet container and the widjet itself
  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widjetContainer.classList.remove("hidden");
    } else {
      this.widjetContainer.classList.add("hidden");
    }
  }

  //toggle the first feedblock

  feedblock1Toggle() {
    const feedblock = document.getElementById("fb1");
    feedblock.addEventListener("click", function (e) {
      const feedblocksContainer = document.getElementsByClassName(
        "feedblocks-container"
      )[0];
      feedblocksContainer.style.display = "none";
      const fb1 = document.getElementsByClassName("feedblock-container1")[0];
      fb1.style.display = "block";
    });

    
    // const ryeButton = document.getElementsByClassName(
    //   "feedblock__form__submit"
    // )[0];
    // ryeButton.addEventListener("click", (event) => {
    //   event.preventDefault()
    //   this.formCompletion()
    // })
  }

  //toggle the form for the first feedblock
  feedblock1FormToggle() {
    const rating = document.getElementsByClassName("star-rating")[0];
    rating.addEventListener("change", () => {
      const fb1Form = document.getElementsByClassName(
        "feedblock1__form-itself"
      )[0];
      fb1Form.style.display = "flex";
    });
  }

  //toggle the second feedblock
  feedblock2toggle() {
    const feedblock = document.getElementById("fb2");
    feedblock.addEventListener("click", () => {
      const feedblocksContainer = document.getElementsByClassName(
        "feedblocks-container"
      )[0];
      feedblocksContainer.style.display = "none";
      const fb2 = document.getElementsByClassName("feedblock-container2")[0];
      fb2.style.display = "flex";
    });
  }

  //toggle the third feedblock
  feedblock3toggle() {
    const feedblock = document.getElementById("fb3");
    feedblock.addEventListener("click", () => {
      const feedblocksContainer = document.getElementsByClassName(
        "feedblocks-container"
      )[0];
      feedblocksContainer.style.display = "none";
      const fb3 = document.getElementsByClassName("feedblock-container3")[0];
      fb3.style.display = "flex";
    });
  }

  formCompletion(feedback) {
    const widjetItself = document.getElementsByClassName('widjet__itself')[0]
    widjetItself.parentElement.removeChild(widjetItself)

    //submission container //this is what is displayed after a submission finishes
    const submissionContainer = document.createElement("div");
    submissionContainer.classList.add("submission-container");

    const submissionIcon = document.createElement("video")
    submissionIcon.src = new URL("../image/thumbs-up.mp4",import.meta.url);
    submissionIcon.alt = 'thumbs up with the left hand'
    submissionIcon.autoplay = true;
    submissionIcon.muted = true;
    submissionIcon.playsInline = true;
    submissionIcon.loop = true
    submissionIcon.classList.add("submission__video")

    const submissionTitle = document.createElement("h3");
    submissionTitle.textContent = feedback;
    submissionTitle.classList.add("title","submission_title");

    const submissionText = document.createElement('p')
    submissionText.textContent = "Thank you for taking the time to let us know about your experience."
    submissionText.classList.add("details")

    submissionContainer.append(submissionIcon, submissionTitle,submissionText)
    this.widjetParent.append(submissionContainer, this.iconContainer)

    this.cancelIcon.addEventListener('click', () => {
      this.widjetContainer.innerHTML = ""
      this.createWidjetContainerContent()
      this.feedblock1Toggle();
      this.feedblock1FormToggle();
      this.feedblock2toggle();
      this.feedblock3toggle();
      this.formCompletion
      this.repositionCancelIconAndContainer()
    })
  }

  async formSubmission (form) {
    const formArr = []
    for (let [, value] of form) {
      formArr.push(value)
    }

    console.log(formArr);
    const [email, comment, rating, id] = formArr;

    const res = await fetch("https://fj-lite-node.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
            createFeedback(payload: {
              feedBlockId: "${id}",
              customerEmail: "${email}",
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

    // if( response.data.createFeedback.success === true) {

    //     this.formCompletion(response.data.createFeedback.message);
    //   } else {
    //     console.log("It not work");
    // }
    createFeedback(id, email, "rating", rating, comment).then((res) => {
      if( res.data.createFeedback.success === true) {
        this.formCompletion(res.data.createFeedback.message);
      } else {
        console.log("It not work");
      }
    });

    return response;
  }



  async issueFormSubmission (form) {
    const values = []
    for (let [, value] of form) {
      values.push(value)
    }

    console.log(values);
    const [email, comment, file, rating, id] = values;
    console.log(email);
    console.log(rating);
    console.log(comment);
    console.log(file);

    // const selectImage = (event) => {
    //   event.preventDefault();
    //   const logo = event.target.files[0];
    //   setSelectedImage(logo);
    //   console.log(selectedImage);
    //   if (!selectedImage) {
    //     return;
    //   }
    // };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "issue_reports");
      const hello = fetch("https://api.cloudinary.com/v1_1/spire-tech/upload", {
        method: "POST",
        body: formData
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          console.log(data.secure_url);
          return data;
        })
        .catch((err) => {
          console.log(err);
          
        });

      

      hello.then((result) => {
        console.log(result);
        if(result.secure_url) {
          createFeedback(id, email, "issue-reports", rating, comment).then((res) => {
            console.log(res);
            if( res.data.createFeedback.success === true) {
              this.formCompletion(res.data.createFeedback.message);
            } else {
              console.log("It not work");
            }
          });
        } else {
          console.log(result.error.message);
        }
      })

    
  }


  async featureFormSubmission (form) {
    const values = []
    for (let [, value] of form) {
      values.push(value)
    }

    console.log(values);
    const [email, comment, rating, id] = values;
    console.log(email);
    console.log(rating);
    console.log(comment);

    createFeedback(id, email, "feature-requests", rating, comment).then((res) => {
      console.log(res);
      if( res.data.createFeedback.success === true) {
        this.formCompletion(res.data.createFeedback.message);
      } else {
        console.log("It not work");
      }
    });
  }

  //styles function to generate css styles for the widjet container and the feedback button
  createStyles() {
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);

    styleTag.innerHTML = `

            * {
              box-sizing:border-box;
              margin:0;
              padding:0;
            }

            :root {
                --primary-color1: #300226;
                --primary-color2: #433D41;
                --primary-color3: #fff;
                --border-color: #AA9EA6;
                --widget-color: #E5E5E5;
                --feedback-button-color: #FDF9EE;
                --feedback-button-hover: #DF41B3;
                --cursor-pointer:pointer;
                --feedblock-submitButton:#F5A623;
                --star-color:#F5A623;
                }

            @font-face {
            font-family: "puntaregular";
            src: url("./fonts/punta_regular-webfont.woff2") format("woff2"),
            url("./fonts/punta_regular-webfont.woff") format("woff");
                }

            @font-face {
            font-family: "Satoshi-Variable";
            src: url("./fonts/Satoshi-Variable.woff2") format("woff2"),
            url("./fonts/Satoshi-Variable.woff") format("woff");
            font-weight: 300 900;
            font-display: swap;
            font-style: normal;
                }

            #container {
              margin: -1px;
            }

            .feedback-button {
                display: flex;
                justify-content: center;
                align-items: center;
                border:none;
                padding: 1em 1em;
                background: var(--feedback-button-color);
                transition: transform .3s ease;
                cursor: var(--cursor-pointer);
            }
            

            .feedback-button-hover: {
              border: 1px dashed var(--feedback-button-hover);
              margin: -1px;
            }


            .feedback-button-hover:hover {
              border: 1px dashed var(--feedback-button-hover);
              margin: -1px;
            }

            .icon {
              width:20px;
              margin-right: 1.3em;
            }

            .feedback-button__text {
                font-family:"Satoshi-Variable";
                color: var(--primary-color2);
                font-weight: bold;
            }

            .feedback-button__text-error {
              font-family:"Satoshi-Variable";
              color: red;
              font-weight: bold;
          }

            .widjet-container {
                box-shadow: 0 0 18px 8px rgba(0,0,0, 0.1);
                position: fixed;
                top:61%;
                left:84.6%;
                transform: translate(-50%,-50%);
                width: 410px;
                border: 1px solid var(--border-color);
                background-color: hsl(0, 100%, 100%);
            }

            .widjet-container.hidden {
                visibility:hidden;
            }
            .widjet-parent{
                display: block;
                padding: 3em 2em;
                border: 1px solid var(--border-color);
                position:relative;
            }

            .widjet__itself {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                background: var(--primary-color3);
            }

            .widjet__child:nth-child(3) div{
                position: relative;
                left: 2px;
                margin-bottom: 2em;
            }

            .widjet__child:nth-child(3) > img {
              bottom: 32px;
            }

            .widjet__child{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 1em;
            }

            .widjet-child:focus-within {
              border: 1px solid var(--star-color);
            }

            .widjet__child__icon{
                margin-right: 2em;
                width:33px;
                height:40px;
                position: relative;
                bottom: 16px;
            }

            .widjet__child__text {
              cursor:pointer;
            }

            .title {
                color: var(--primary-color1);
                font-size: 20px;
                font-family: "puntaregular";
                margin:0;
                font-weight:400;
            }

            .details {
                color: var(--primary-color2);
                font-size: 14px;
                line-height: 1.6;
                font-family: "Satoshi-Variable";
                line-height: 21.42px;
                margin-block-start: .5em;
                margin-block-end: .5em;
            }

            a {
                cursor: pointer;
            }

            a:clicked {
                color: var(--primary-color2);
            }

            .cancel-icon {
                position: absolute;
                left: -8%;
                bottom: 94%;
                cursor: var(--cursor-pointer);
            }

            .spireLogo-container {
              display:flex;
              flex-direction: column;
              font-family: "Satoshi variable";
              margin: 0 auto;
              align-items:center;

            }

            .spireLogo__image {
              width: 23px;
              height: 9px;

            }

            .spireLogo__text{
               font-family:"Satoshi-Variable";
               color: var(--primary-color2);
               font-size: .7em;
              }

            .spire__text{
              font-weight:bold;
              position:relative;
              color:var(--primary-color1);
            }

            .spire__text::after {
              content: '';
              width: 27px;
              height: 0.8px;
              background: var(--primary-color1);
              position: absolute;
              top: 16.6px;
              right: -0.2px;
            }

            .back-button {
              display: flex;
              outline: none;
              border: none;
              background: none;
              color: #500740;
              align-items: center;
              font-size: 1rem;
              cursor: pointer;
              margin-bottom: 1.5rem;
              gap: 5px;
              text-align: center;
            }

            .feedblock-container1 {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              justify-content: center;
              display: none;
            }

            .feedblock-container2{
              flex-direction: column;
              text-align:center;
              justify-content:center;
              display:none;
            }

            .feedblock-container3 {
              flex-direction: column;
              text-align:center;
              justify-content:center;
              display:none;
            }

            .feedblock1__form-itself{
              display: none;
              width: 100%;
              flex-direction: column;
              font-family:"Satoshi-variable";
              color: var(--primary-color2);
              text-align: left;
            }

            .feedblock2__form-itself {
              display: flex;
              width: 100%;
              flex-direction: column;
              font-family:"Satoshi-variable";
              color: var(--primary-color2);
              text-align: left;
            }

            .feedblock3__form-itself {
              display: flex;
              width: 100%;
              flex-direction: column;
              font-family:"Satoshi-variable";
              color: var(--primary-color2);
              text-align: left;
            }

            /*style the rating container*/

            .star-rating{
              display:flex;
              flex-direction: row-reverse;
              align-items: center;
              justify-content: center;
              width: auto;
              font-family:"Satoshi-variable";
              margin:10px 0 20px 0;
              padding: 8px;
              position:relative;
            }

            .star-rating input{
              display:none;
            }

            .star-rating > label {
              width: 40px;
              height: 40px;
              font-family: "Satoshi-variable";
              color: var(--border-color);
              position: relative;
              transition: 0.2 ease;
            }

            .star-rating label::before {
              content: "\\2606";
              top: 0px;
              line-height: 26px;
              font-size: 30px;
            }

            .star-rating label:hover {
              color: var(--primary-color1);
              transition: 0.2 ease;
              cursor: pointer;
            }

            .star-rating label:active::before {
              transform: scale(1.1);
            }

            .star-rating input:checked ~ label:before {
              content: '\\2605';
              color: var(--star-color);
            }

            @moz-document url-prefix() {
              .star-rating input:checked ~ label:before {
                font-size: 36px;
                line-height: 21px;
              }
            }

            .feedblock__form__email{
              margin-bottom: 1em;
              height: 48px;
              font-size: 16px;
            }

            .feedblock__form__comment{
              height: 110px;
              margin-bottom: 1.5em;
              padding-top: .7em;
              padding-left: .5em;
              font-size: .9em;
            }

            .fb1__details {
              width: 94%;
              line-height: 24.48px;
            }

            .fb2__details {
              margin-bottom: 2em;
            }

            .fb3__details {
              margin-bottom: 2em;
            }

            .fb1__comment{
              margin-bottom: .3em;
              position: relative;
              font-size: .9em;
            }

            .fb1__email {
              margin-bottom: .3em;
              position: relative;
              font-size:.9em;
            }

            .fb1__email__required{
              font-size:.66em;
              position:absolute;
              bottom: 0;
              right: 181px;
            }


            .fb1__email__required::before {
              content: "\\002A";
              color:red;
            }

            .fb1__comment__optional {
              font-size:.66em;
              position: absolute;
              right: 171px;
              bottom: 0;
            }

             .fb3__comment__required {
              right: 147px;
            }

            input[type="email"] {
              font-family: "Satoshi-Variable";
              padding-left: 0.5em;
              padding-top: 0.1em;
              padding-bottom: 0.4em;
              text-align: left;
              font-size: 0.9em;
            }

            input[type="email"]:focus {
              outline:none;
              border: 1px solid var(--star-color);
            }
            
             .feedblock__form__submit {
              font-family: "Satoshi-Variable";
              background: var(--feedblock-submitButton);
              border: none;
              color: var(--primary-color2);
              font-size: 15px;
              padding: 0.8em 0.7em;
              font-weight: 700;
              cursor:pointer;
              margin-bottom: 4em;
            }

            .file-upload {
              display: flex;
              flex-direction: row-reverse;
              justify-content:center;
              align-items: center;
              position: relative;
              width:100%;
              border: 1px dashed #000;
              padding: .7em .8em;
              margin-bottom: 1.5em;
            }

            .file-upload:focus-within{
              border: 1px solid var(--star-color);
            }

            .file-upload img{
              margin-right: .8em;
            }

            #screenshot {
              cursor:pointer;
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap; /* 1 */
              clip-path: inset(50%);
              border: 0;
            }

            textarea{
              resize: none;
              font-family: "Satoshi-Variable";  
            }

            .submission-container{
              text-align:center;
              margin-bottom: 2rem;
            }

            .submission__video{
              margin-bottom:2rem;
              width: 49%;
              height:167.575px;
            }




            .lds-facebook {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .lds-facebook div {
              display: inline-block;
              position: absolute;
              left: 8px;
              width: 12px;
              background: var(--feedback-button-hover);
              animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            }
            .lds-facebook div:nth-child(1) {
              left: 8px;
              animation-delay: -0.24s;
            }
            .lds-facebook div:nth-child(2) {
              left: 32px;
              animation-delay: -0.12s;
            }
            .lds-facebook div:nth-child(3) {
              left: 56px;
              animation-delay: 0;
            }
            @keyframes lds-facebook {
              0% {
                top: 8px;
                height: 20px;
              }
              50%, 100% {
                top: 24px;
                height: 30px;
              }
            }






            .lds-ripple {
              display: inline-block;
              position: relative;
              width: 40px;
              height: 40px;
            }
            .lds-ripple div {
              position: absolute;
              border: 4px solid var(--feedback-button-hover);
              opacity: 1;
              border-radius: 50%;
              animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            }
            .lds-ripple div:nth-child(2) {
              animation-delay: -0.5s;
            }
            @keyframes lds-ripple {
              0% {
                top: 20px;
                left: 20px;
                width: 0;
                height: 0;
                opacity: 1;
              }
              100% {
                top: 0px;
                left: 0px;
                width: 42px;
                height: 42px;
                opacity: 0;
              }
            }



            .loading {
              display: inline-block;
              position: relative;
              width: 40px;
              height: 40px;
            }
            .lds-ripple div {
              position: absolute;
              border: 4px solid var(--feedback-button-hover);
              opacity: 1;
              border-radius: 50%;
              animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            }
            .lds-ripple div:nth-child(2) {
              animation-delay: -0.5s;
            }
            @keyframes lds-ripple {
              0% {
                top: 20px;
                left: 20px;
                width: 0;
                height: 0;
                opacity: 1;
              }
              100% {
                top: 0px;
                left: 0px;
                width: 42px;
                height: 42px;
                opacity: 0;
              }
            }
            
            
        }
      `;
  }
}
