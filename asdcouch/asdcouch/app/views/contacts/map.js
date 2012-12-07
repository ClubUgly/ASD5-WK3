function(doc) {
  if (doc._id.substr(o, 6)==="contact" {
    emit(doc._id,{
     	"fname":doc.fname,
     	"email":doc.email,
     	"url":doc.url,
    	"sex":doc.sex,
     	"borndate":doc.borndate,
     	"groups":doc.Candidate Selection,
     	"quantity":doc.quantity,
     	"comments":doc.comments,
     	"terms":doc.TOS,
    }    	
    
    );
  }
};