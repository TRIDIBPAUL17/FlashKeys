import React, { useEffect } from 'react'
import Graph from './Graph'
import { db, auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useAuthState } from 'react-firebase-hooks/auth';

const Stats = ({wpm, resetTest, accuracy, correctChars, incorrectChars, missedChars, extraChars,graphData}) => {
    // console.log(graphData);
    // arr= [1,1,2,3,2,2,2,3,3,3,3,4,4,4], set(arr) = [1,2,3,4]
    var timeSet = new Set();  //store unique values of time
    // has(value) -> true or false , constant time
    // add(value) -> adds the value in set
    const {setAlert} = useAlert();
    const newGraph = graphData.filter((i)=>{
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });

    const [user] = useAuthState(auth);

    const pushResultToDatabase = ()=>{
        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        if(!isNaN(accuracy)){
            resultsRef.add({
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                timeStamp: new Date()
            }).then((response)=>{
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'result saved to db'
                });
            });
        }
        else{
            setAlert({
                open: true,
                type: 'error',
                message: 'invalid test'
            });
        }
        
    }

    useEffect(()=>{

        if(user){
            //saving because user is logged in;
            pushResultToDatabase();
        }
        else{
            //no user, no save
            setAlert({
                open: true,
                type: 'warning',
                message: 'login to save results'
            });
        }
        
    },[]);


    // console.log(graphData,newGraph);
return (
    <div className="stats-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}%</div>
            <div className="title">Characters</div>
            <div className="subtitle" style={{ display: 'flex', gap: '30px', justifyContent: 'center', fontSize: '18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Correct</span>
                        <span style={{ fontSize: '1.25rem' }}>{correctChars}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold'}}>Incorrect</span>
                        <span style={{ fontSize: '1.25rem' }}>{incorrectChars}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Missed</span>
                        <span style={{ fontSize: '1.25rem' }}>{missedChars}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Extra</span>
                        <span style={{ fontSize: '1.25rem' }}>{extraChars}</span>
                    </div>
                    </div>
            <div className="subtitle" onClick={resetTest} style={{ cursor: 'pointer', display: 'inline'}}>Restart</div>

        </div>
        <div className="right-stats" style={{ flex: '1', marginLeft: '20px' }}>
<Graph graphData={newGraph} />
</div>

    </div>
)
}

export default Stats