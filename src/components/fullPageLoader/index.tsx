import { Grid } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  Div,
  StyledBar,
  StyledButton,
  StyledGrid,
  StyledMainGrid,
  StyledTable,
  WraperGrid,
} from "./index.style";
import SharedLayout from "../layout/shared-layout";

function FullPageSkeleton() {
  return (
    <StyledMainGrid>
      <Stack>
        <WraperGrid>
          <StyledGrid>
            <Grid>
              <StyledButton variant="rounded" width={120} height={43} />
            </Grid>
            <Grid>
              <Div>
                <StyledBar variant="rounded" width="100%" height={120} />
              </Div>
            </Grid>
            <Grid>
              <Div>
                <StyledTable variant="rounded" width="100%" height={330} />
              </Div>
            </Grid>
          </StyledGrid>
        </WraperGrid>
      </Stack>
    </StyledMainGrid>
  );
}

export default function FullPageLoader() {
  return <SharedLayout children={<FullPageSkeleton />} title={"Rooms"} />;
}
