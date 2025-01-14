/*
 * Copyright 2025 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { InfoCard, ResponseErrorPanel } from '@backstage/core-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const mockData = [
  { date: '2024-01-01', bugs: 10, vulnerabilities: 5, coverage: 70 },
  { date: '2024-02-01', bugs: 8, vulnerabilities: 4, coverage: 75 },
  { date: '2024-03-01', bugs: 6, vulnerabilities: 3, coverage: 80 },
  { date: '2024-04-01', bugs: 4, vulnerabilities: 2, coverage: 85 },
  { date: '2024-05-01', bugs: 2, vulnerabilities: 1, coverage: 90 },
];

export const CodeQualityComponent = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setMetrics(mockData);
    } catch (error) {
      return <ResponseErrorPanel error={error} />;
    } finally {
      setLoading(false);
    }
    return undefined;
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InfoCard title="Code Quality Analysis">
          <CardContent>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <>
                <Typography variant="h6">Code Quality Metrics</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Trends Over Time</Typography>
                        <LineChart
                          width={500}
                          height={300}
                          data={metrics}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="bugs"
                            stroke="#8884d8"
                          />
                          <Line
                            type="monotone"
                            dataKey="vulnerabilities"
                            stroke="#82ca9d"
                          />
                          <Line
                            type="monotone"
                            dataKey="coverage"
                            stroke="#ffc658"
                          />
                        </LineChart>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          Latest Issues Detected
                        </Typography>
                        <Typography>
                          Bugs: {metrics[metrics.length - 1].bugs}
                        </Typography>
                        <Typography>
                          Vulnerabilities:{' '}
                          {metrics[metrics.length - 1].vulnerabilities}
                        </Typography>
                        <Typography>
                          Coverage: {metrics[metrics.length - 1].coverage}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </InfoCard>
      </Grid>
    </Grid>
  );
};

export default CodeQualityComponent;
