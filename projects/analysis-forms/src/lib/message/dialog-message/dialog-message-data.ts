export class DialogMessageData {
   title: string;
   message: string;
   width: string;
   acceptButton?: boolean;
   acceptButtonText?: string;
   rejectButton?: boolean;
   rejectButtonText?: string;

   constructor() { }

   static build(title: string, message: string, acceptButton: boolean, 
      acceptButtonText: string, rejectButton: boolean, 
      rejectButtonText: string, width: string = "576px"): DialogMessageData {
      const configData = new DialogMessageData();
      configData.title = title;
      configData.message = message;
      configData.acceptButton = acceptButton;
      configData.acceptButtonText = acceptButtonText;
      configData.rejectButton = rejectButton;
      configData.rejectButtonText = rejectButtonText;
      configData.width = width;

      return configData;
   }
}