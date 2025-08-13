// @ts-nocheck
import Grid from '@mui/material/Grid';
import translations from '../../../translation/en';
import { GEOPanel as GEO, VerticalList } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import { calcPrecentage, normalizeItemsPercentage } from 'utils';

const {
  pages: { discoveryDigital: texts }
} = translations;

const GEOPanel = () => {
  const {
    discoveryDigital: { org_country: orgCountries, external_country: externalCountries, mapCountries }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container flexDirection="row">
      <Grid item sm={8} md={8}>
        <GEO orgCountries={orgCountries} externalCountries={externalCountries} />
      </Grid>
      <Grid item sm={4} md={4}>
        <Grid container flexDirection="column">
          {/* <Grid item>
            <Grid container flexDirection="row" alignItems={'center'} sx={{ paddingTop: 1 }}>
              <Grid item>
                <Indicator type="legend" size="s" color="#4B7AE7" />
              </Grid>
              <Grid item sx={{ fontSize: 11, fontWeight: 400, paddingLeft: 1 }}>
                Org Assets
              </Grid>
              <Grid item sx={{ paddingLeft: 2 }}>
                <Indicator type="legend" size="s" color="#EF8068" />
              </Grid>
              <Grid item sx={{ fontSize: 11, fontWeight: 400, paddingLeft: 1 }}>
                External Assets
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item sx={{ marginTop: 3 }}>
            {['org_country', 'external_country'].map((item: string) => {
              const data = item === 'org_country' ? orgCountries : externalCountries;
              let items = data.results.slice(0, 3).map((item: object) => ({
                name: Object.keys(item)[0].toUpperCase(),
                value: calcPrecentage(data.count, Object.values(item)[0])
              }));
              const totalValues = items.reduce((sum: number, item: any) => sum + item.value, 0);
              if (totalValues < 100) {
                items = [
                  ...items,
                  {
                    name: 'Other',
                    value: 100 - totalValues
                  }
                ];
              }
              items = normalizeItemsPercentage(items);

              return (
                <Grid item key={item} sx={{ paddingRight: 3, marginTop: 1 }}>
                  <VerticalList
                    titleWeight={400}
                    titleTextSize={11}
                    // title={texts[item as keyof typeof texts]}
                    title={texts[item]}
                    items={items}
                    formatType="%"
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GEOPanel;
