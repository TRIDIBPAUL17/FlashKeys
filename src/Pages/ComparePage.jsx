import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import Graph from '../Components/Graph';
import { useTheme } from '../Context/ThemeContext';

const ComparePage = () => {
  const { theme } = useTheme();
  const { username } = useParams();
  const [loggedinUserData, setLoggedinUserData] = useState([]);
  const [loggedinUserGraphData, setLoggedinUserGraphData] = useState([]);
  const [compareUserData, setCompareUserData] = useState([]);
  const [compareUserGraphData, setCompareUserGraphData] = useState([]);

  useEffect(() => {
    const getUID = async () => {
      const response = await db.collection('usernames').doc(username).get();
      return response.data().uid;
    };

    const getData = async () => {
      const compareUserUID = await getUID();
      const { uid } = auth.currentUser;
      const resultsRef = db.collection('Results');

      let userData = [], userGraph = [];
      let compareData = [], compareGraph = [];

      const [userSnap, compareSnap] = await Promise.all([
        resultsRef.where('userID', '==', uid).orderBy('timeStamp', 'desc').get(),
        resultsRef.where('userID', '==', compareUserUID).orderBy('timeStamp', 'desc').get(),
      ]);

      userSnap.docs.forEach(doc => {
        userData.push({ ...doc.data() });
        userGraph.push([doc.data().timeStamp, doc.data().wpm]);
      });

      compareSnap.docs.forEach(doc => {
        compareData.push({ ...doc.data() });
        compareGraph.push([doc.data().timeStamp, doc.data().wpm]);
      });

      setLoggedinUserData(userData);
      setLoggedinUserGraphData(userGraph.reverse());
      setCompareUserData(compareData);
      setCompareUserGraphData(compareGraph.reverse());
    };

    getData();
  }, [username]);

  const calcAverage = data => {
    if (!data.length) return 0;
    return (data.reduce((acc, curr) => acc + curr.wpm, 0) / data.length).toFixed(2);
  };

  const cellStyle = {
    padding: '1rem',
    border: '2px solid white', // thicker and more visible border
    color: theme.textColor,
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        maxWidth: '1200px',
        margin: 'auto',
        color: theme.textColor,
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: theme.title }}>
        Compare Typing Stats
      </h2>
  
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* User Graphs */}
        <div
          style={{
            background: theme.background,
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: theme.title }}>
            {auth.currentUser?.displayName || 'You'}
          </h3>
          <Graph graphData={loggedinUserGraphData} type="date" />
        </div>
  
        <div
          style={{
            background: theme.background,
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 0 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: theme.title }}>
            {username}
          </h3>
          <Graph graphData={compareUserGraphData} type="date" />
        </div>
      </div>
  
      <div
        style={{
          marginTop: '2.5rem',
          background: theme.background,
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ marginBottom: '1rem', color: theme.title, textAlign: 'center' }}>
          Comparison Summary
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead
              style={{
                backgroundColor: theme.background, // Match the background with table body
                color: theme.textColor, // Ensure the text color is the same as the body
              }}
            >
              <tr>
                <th style={cellStyle}>Metric</th>
                <th style={cellStyle}>{auth.currentUser?.displayName || 'You'}</th>
                <th style={cellStyle}>{username}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>Total Tests</td>
                <td style={cellStyle}>{loggedinUserData.length}</td>
                <td style={cellStyle}>{compareUserData.length}</td>
              </tr>
              <tr>
                <td style={cellStyle}>Average WPM</td>
                <td style={cellStyle}>{calcAverage(loggedinUserData)}</td>
                <td style={cellStyle}>{calcAverage(compareUserData)}</td>
              </tr>
              <tr>
                <td style={cellStyle}>Highest WPM</td>
                <td style={cellStyle}>{Math.max(...loggedinUserData.map(i => i.wpm), 0)}</td>
                <td style={cellStyle}>{Math.max(...compareUserData.map(i => i.wpm), 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
